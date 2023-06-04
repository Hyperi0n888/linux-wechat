const { writeFile, readFile } = require('fs/promises')

const COOKIES_FILE = "cookies.json"


function getCookies() {
    return readFile(COOKIES_FILE, {
        encoding: 'utf8'
    }).then(content=>JSON.parse(content))
}

function setCookies(cookies) {
    return writeFile(COOKIES_FILE, cookies, {
        encoding: 'utf-8'
    })
}

module.exports = {
    getCookies,
    setCookies
}