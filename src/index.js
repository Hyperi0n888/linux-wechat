const { app, BrowserWindow, Tray, Menu } = require("electron")
const ICON = require('./constant/icon')
const { getCookies, setCookies } = require("./utils/auth")

let win = null

async function createWin() {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        icon: ICON,
        show: false
    })
    win.loadURL("https://wx2.qq.com/index.php")

    const cookies = await getCookies()
    for(let idx=0; idx<cookies.length; ++idx) {
        await win.webContents.session.cookies.set(cookies[idx])
    }
    
    win.once("ready-to-show", () => {
        win.show()
    })
    win.once("page-title-updated", ()=>{
        win.webContents.session.cookies.get({})
        .then(cookies=>{
            setCookies(JSON.stringify(cookies))
        })
    })
    win.on("close", e => {
        e.preventDefault()
        win.hide()
    })
    return win
}

function createTray() {
    const tray = new Tray(ICON)
    const contextMenu = Menu.buildFromTemplate([
        { label: '显示', type: 'radio', click: hanldeShow },
        { label: '退出微信', type: 'radio', click: handleQuit },
    ])
    tray.setToolTip("微信正在后台运行")
    tray.setContextMenu(contextMenu)
    return tray
}

function hanldeShow () {
    if(win === null) {
        return undefined
    }
    app.focus()
    win.show()
}

function handleQuit () {
    app.exit()
}


app.whenReady()
    .then(() => {
        createWin()
        createTray()
    })

