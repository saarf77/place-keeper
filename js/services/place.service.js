
const STORAGE_KEY_PLACES = 'places'

let gPlaces
_createPlaces()

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {
    gPlaces = gPlaces.filter(p => p.id !== placeId)
    _savePlacesToStorage()
}

function addPlace(name, lat, lng, zoom) {
    //{ id: makeId(), lat, lng, name, zoom }
    gPlaces.unshift({ id: makeId(), lat, lng, name, zoom })
    _savePlacesToStorage()
}

function getPlaceById(placeId) {
    return gPlaces.find(p => p.id === placeId)
}


function _createPlace(name, lat, lng, zoom) {
    return { id: makeId(), lat, lng, name, zoom }
}

function _createPlaces() {
    const places = loadFromStorage(STORAGE_KEY_PLACES) || []
    if (!places || !places.length) {
        for (let i = 0; i < 3; i++) {
            const placeName = 'DemoPlace' + (i + 1)
            places.push(_createPlace(placeName, 33 + i, 35 + i, 10))
        }
    }
    gPlaces = places
    _savePlacesToStorage()
}

function _savePlacesToStorage() {
    saveToStorage(STORAGE_KEY_PLACES, gPlaces)
}

function getPlacesAsCSV() {
    if (!gPlaces.length) return 'No Places'
    const csvLines = gPlaces.map(({ id, lat, lng, name }) => `${id},${lat},${lng},${name}\n`)
    csvLines.unshift('Id,Lat,Long,Name\n')
    console.log('csvLines', csvLines.join(''));
    return csvLines.join('')
}