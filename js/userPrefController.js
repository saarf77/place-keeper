'use strict';

function prefChangeNotice(success = true) {

    var elNotice = document.querySelector('.settings-message');

    if (success) {
        elNotice.textContent = 'Settings Saved Successfully!';
    } else {
        elNotice.textContent = 'Settings Unchanges - Pick A Date!';
    }
    elNotice.style.opacity = '1';

    setTimeout(() => {
        elNotice.style.opacity = '0';
    }, 2000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function onColorPrefChange(event) {

    event.preventDefault();
    prefChangeNotice();
    var elNewBgc = document.querySelector('input[name = "bgc"]');
    var elNewTc = document.querySelector('input[name = "tc"]');

    gPref = { bgc: elNewBgc.value, textColor: elNewTc.value };
    setUserPrefChanges(gPref);
    _savePreferencesToStorage();
}

function onSavePrefs(ev){
    ev.preventDefault()
    var userPrefs = {
       firstName: document.querySelector('#name').value,
       zoomFactor: document.querySelector('#zoom').value,
       bgdColor: document.querySelector('#bcg-color').value,
       txtColor: document.querySelector('#txt-color').value
    }
    savePrefs(userPrefs)
    window.location.href = 'index.html'
    return userPrefs
}

function showZoom(newVal) {
    document.getElementById('sZoom').innerHTML = newVal
}

function onMapInit(){
    _createLocations()
}

function onIndexInit(){
    var userPrefs = getUserPrefs()
    console.log(userPrefs);
    document.querySelector('.title-name-span').innerText = userPrefs.firstName
    document.querySelector('body').style.backgroundColor = userPrefs.bgdColor
    document.querySelector('.main-index-container').style.color = userPrefs.txtColor

}

function prefChangeNotice(success = true) {

    var elNotice = document.querySelector('.settings-message');

    if (success) {
        elNotice.textContent = 'Settings Saved Successfully!';
    } else {
        elNotice.textContent = 'Settings Unchanges - Pick A Date!';
    }
    elNotice.style.opacity = '1';

    setTimeout(() => {
        elNotice.style.opacity = '0';
    }, 2000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}