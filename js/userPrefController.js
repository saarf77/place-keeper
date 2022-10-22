'use strict'

function init(){
    renderUserSettings()
}

function onSetSettings(ev){
ev.preventDefault()
const name = document.querySelector('.name').value
const background = document.querySelector('.background').value
const color = document.querySelector('.color').value
const range = document.querySelector('.range').value
const map = document.querySelector('.map-start').value

setSettings({name,background,color,range,map})
console.log(name,background,color,range,map);
}

function renderUserSettings(){
    const {name,background,color,range,map} = getSettings()

    setBackgroundColorAndColor()

    document.querySelector('.name').value = name
    document.querySelector('.background').value = background
    document.querySelector('.color').value = color
    document.querySelector('.range').value = range || 0
    onSetZoom(range||0)
    document.querySelector('.map-start').value = map
}

function onSetBackgroundColor(color){
    document.querySelector('body').style.backgroundColor = color
}

function onSetTextColor(color){
    document.querySelector('body').style.color = color
}

function onSetZoom(val){
    document.querySelector('.range-value').innerText = val
}

