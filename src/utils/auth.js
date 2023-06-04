const { writeFile, readFile, access } = require('fs/promises')
const { encrypt, decrypt } = require('./AES')


const COOKIES_FILE = "cookies.json"


async function getCookies() {
    const cookies = []
    try {
        await access(COOKIES_FILE)
        const content = await readFile(COOKIES_FILE, {
            encoding: 'utf8'
        })
        const plainText = decrypt(content)
        cookies = JSON.parse(plainText)
    }
    catch(e) {
        return []
    }
    return cookies
}

function setCookies(cookies) {
    const cipherText = encrypt(cookies)
    return writeFile(COOKIES_FILE, cipherText, {
        encoding: 'utf-8'
    })
}

module.exports = {
    getCookies,
    setCookies
}