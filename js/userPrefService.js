'use strict';

var gPref;
const KEYp = 'prefData';
var gUserData;

const USER_PREF_OBJ_KEY = 'user-pref-DB'
var gPrefs = {}

function setUserPrefChanges(preferences) {
    document.body.style.backgroundColor = preferences.bgc;
    document.body.style.color = preferences.textColor;
}

function savePrefs(userPrefs){
    gPrefs = userPrefs
    _savePrefsToStorage()
    console.log(gPrefs);
}

function getUserPrefs(){
   return loadFromStorage(USER_PREF_OBJ_KEY)
}

function _savePrefsToStorage() {
    saveToStorage(USER_PREF_OBJ_KEY, gPrefs)
}