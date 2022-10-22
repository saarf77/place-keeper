const STORAGE_KEY = 'userData'
const STORAGE_KEY_LOC = 'loc'

function saveUser(user) {
    saveToStorage(STORAGE_KEY, user)
}

function getUser() {
    return loadFromStorage(STORAGE_KEY)
}

function saveSelectedPlace(loc) {
    saveToStorage(STORAGE_KEY_LOC, loc)
}

function getSelectedPlace() {
    return loadFromStorage(STORAGE_KEY_LOC)
}

