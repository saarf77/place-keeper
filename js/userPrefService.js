'use strict'

var gSettings = loadFromStorage('settings') || _createDefultSettings()

function setSettings(settings) {
    // const { name, background, color, range, map } = settings

    gSettings = settings
    saveSettings()
}


function saveSettings() {
    saveToStorage('settings', gSettings)
}

function getSettings() {
    return gSettings
}

function _createDefultSettings() {
    const defaultSettings = {
        name: '',
        background: '#eeeeee',
        color: '#333333',
        zoom: '8',
        map: ''
    }
    saveToStorage('settings', defaultSettings)
    return defaultSettings
}

function setBackgroundColorAndColor() {
    const elBodyStyle = document.querySelector('body').style
    elBodyStyle.backgroundColor = gSettings.background
    elBodyStyle.color = gSettings.color
}