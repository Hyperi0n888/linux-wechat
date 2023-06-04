const { nativeImage } = require('electron')
const { resolve } = require('path')

const ICON_PATH = resolve('resource/icon.png')
const ICON = nativeImage.createFromPath(ICON_PATH)

module.exports = ICON