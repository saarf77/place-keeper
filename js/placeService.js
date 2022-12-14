'use strict';

var gLocations;
var gCurrLocation;
var map;
var onDelete = false;
const KEY = 'userData';

function createLocation() {
    var locations = loadFromStorage(KEY);
    gLocations = locations;
    _saveLocationsToStorage();
}

function _saveLocationsToStorage() {
    saveToStorage(KEY, gLocations);
}

function getLocationById(locationId) {
    var location = gLocations.find(function (location) {
        return locationId === location.id;
    })
    return location;
}

var markers = google.maps.Marker()
function initMap(lat = null, lng = null) {
    var centerOn;
    if (!lat || !lng) {
        // Modiin
        centerOn = { lat: 31.8903, lng: 35.0104 };
    } else {

        centerOn = { lat, lng };
    }
    var elMap = document.querySelector('#map');
    var options = { center: centerOn, zoom: 15, gestureHandling: 'greedy' };
    map = new google.maps.Map(elMap, options);
    map.addListener('click', function (event) {
        onNewLocation(event);
        renderMarkers()

    });
    renderMarkers()
    
}


// // In the following example, markers appear when the user clicks on the map.
// // Each marker is labeled with a single alphabetical character.
// const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let labelIndex = 0;

// function initMap() {
//   const Modiin = { lat: 31.8903, lng: 35.0104  };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 12,
//     center: Modiin,
//   });

//   // This event listener calls addMarker() when the map is clicked.
//   google.maps.event.addListener(map, "click", (event) => {
//       addMarker(event.latLng, map);
//       onNewLocation(event);
//   });
//   // Add a marker at the center of the map.
//   addMarker(Modiin, map);
// }

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
    var marker =new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    });
    markers = []
    markers.push(marker)
}

window.initMap = initMap;





function onNewLocation(event) {
    var latLng = event.latLng;
    var lat = latLng.lat();
    var lng = latLng.lng();

    var inputArea = document.querySelector(".error-input");
    inputArea.innerHTML = `
        <form>
            <input type="text" name="new-location" placeholder="Enter New Place Name">
            <button onclick="addNewLocation(event)">Add</button>
        </form>
    `;
    if (!inputArea.classList.contains('show-map-section')) {

        inputArea.classList.add('show-map-section');
    }

    gCurrLocation = { lat, lng };
}

function addNewLocation(event) {

    event.preventDefault();

    var newLocationName = document.querySelector('input[name = "new-location"]');

    var name = newLocationName.value;
    var lat = gCurrLocation.lat,
        lng = gCurrLocation.lng;
    var date = new Date()
    var formatedDate = date.getDate()+ "-" + date.getMonth()+ "-" +date.getFullYear()+ ",  " + date.getHours() + ":" + date.getMinutes() 
    document.querySelector('.error-input').innerHTML = '';
    let newLocation = { id: makeId(),lat: lat, lng: lng, name: name, date: formatedDate};

    if (gLocations && gLocations.length) {

        gLocations.unshift(newLocation);

    } else {

        gLocations = [newLocation];
    }
    console.log(gLocations);
    _saveLocationsToStorage();
    renderFavoritePlaces();
    showHideMapInput();
}

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude }, 10)
    var date = new Date(position.timestamp)
    document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

function moveMap(lat, lng) {
    map.setCenter({ lat, lng }, 10)
}

function renderMarkers() {
    const places = getPlaces()
    // remove previous markers
    gMarkers.forEach(marker => marker.setMap(null))
    // create a marker for every place
    gMarkers = places.map(({ lat, lng, name }) => {
        const coord = { lat, lng }
        return new google.maps.Marker({
            position: coord,
            map: gMap,
            title: name
        })
    })
}