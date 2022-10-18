'use strict';

async function onInit(local = '') {
    var initialPreferences = loadFromStorage(KEYp);
    if (initialPreferences) {
        if (initialPreferences.gPref != undefined) {
            setUserPrefChanges(initialPreferences.gPref);
        }
    }
    if (local === 'map') {
        gLocations = loadFromStorage(KEY);
        renderFavoritePlaces();
    } else if (local === 'user-pref') {
        gUserData = loadFromStorage(KEYp);
        if (gUserData) {
            gPref = gUserData.gPref;
        }
        setTimeout(() => {
            var allSettings = document.querySelectorAll('.preference-box');
            allSettings.forEach(setting => {
                setting.style.opacity = '1';
            })
        }, 200);
    }
}

function makeId(length = 10) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}
