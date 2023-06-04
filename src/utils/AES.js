const { AES, enc } = require("crypto-js")

const KEY = require('../constant/aes-key')


function encrypt(data) {
    return AES.encrypt(data, KEY).toString()
}

function decrypt(cipherText) {
    return AES.decrypt(cipherText, KEY).toString(enc.Utf8)
}

module.exports = {
    encrypt,
    decrypt
}