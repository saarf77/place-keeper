'use strict';

function deleteLocation(locationId) {
    // event.stopPropagation();
    if (onDelete) return;

    var locationIdx = gLocations.findIndex(function (location) {
        return locationId === location.id;
    })
    gLocations.splice(locationIdx, 1);
    _saveLocationsToStorage();
    document.querySelector(`.data-${locationId}`).classList.add('hide');
    onDelete = true;

    setTimeout(() => {

        renderFavoritePlaces();
        onDelete = false;
    }, 300);
}

function renderFavoritePlaces() {

    var favoriteLocations = loadFromStorage(KEY);

    var strHtml = favoriteLocations.map(location => {

        return `
        
        <div class="fav-location data-${location.id}" onclick="moveMap(${location.lat}, ${location.lng})">
            <p class="location-name">${location.name}</p>
            <div class="lat-lng">
            <div class="coord-block"><span>Lat:</span><p>${location.lat}</p></div>
            <div class="coord-block"><span>Lng:</span><p>${location.lng}</p></div>
            </div>
            <i class="fas fa-times" onclick="deleteLocation('${location.id}')"></i>
            <button class="show-btn btn" onclick="onShowLocation(${location.id})">🚩</button>
            <button class="delete-btn btn" onclick="onDeletePlaces(${location.id})">❌</button>
        </div>
        `;
    });

    document.querySelector('.fav-locations').innerHTML = strHtml.join('');
}

function onDeletePlaces(placeId) {
    deletePlace(placeId)
    renderFavoritePlaces();
    _saveLocationsToStorage()

}

function deletePlace(placeId) {
    var foundPlaceIdx = gPlaces.findIndex(function (place) {
        return place.id === placeId
    })
    gPlaces.splice(foundPlaceIdx, 1)
}

function getPlace(id) {
    var foundPlace = gPlaces.find(function (place) {
        return id === place.id;
    })
    return foundPlace;
}

function handleLocationError(error) {
    var locationError = document.getElementById("error-input");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }

    showHideMapInput();
}

function showHideMapInput() {

    var locationError = document.querySelector('.error-input');

    if (!locationError.classList.contains('show-map-section')) {

        locationError.classList.add('show-map-section');

        setTimeout(() => {
            locationError.classList.remove('show-map-section');
        }, 3000);
    } else {

        locationError.classList.remove('show-map-section');
    }
}




// var gLocations
// const LOCATIONS_STORAGE_KEY = 'locationsDB'

// function _createLocations() {
//     var locations = loadFromStorage(LOCATIONS_STORAGE_KEY)

//     if (!locations || !locations.length) {
//         locations = []
//         locations.push(createLocation())
//     }
//     gLocations = locations
//     saveLocationsToStorage()
// }

function createLocation() {
    var locations = loadFromStorage(KEY);
    gLocations = locations;
    _saveLocationsToStorage();
}

function createLocation(lat = 31.783012, lng = 34.631833, locName = 'home') {
    return {
        id: makeId(),
        lat,
        lng,
        locName,
        timeStamp: Date.now()
    }
}

function getGLocations() {
    return gLocations
}

function saveLocationsToStorage() {
    saveToStorage(LOCATIONS_STORAGE_KEY, gLocations)
}