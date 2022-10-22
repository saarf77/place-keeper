let gMap = null
let gMarkers = []

function onInit() {
    renderPlaces()
    initMap()
    const { bgColor, textColor, name } = user

    const elH2 = document.querySelector('.greet')

    elH2.innerText = 'Welcome ' + name
}

function renderPlaces() {
    const places = getPlaces()
    const elList = document.querySelector('.place-list')
    const strHtmls = places.map(({ id, name }) => {
        return `
        <li class="flex clean-list">
        <h1>${name}</h1>
        <button onclick="onPanToPlace('${id}')">GO</button>
        <button onclick="onRemovePlace('${id}')">X</button>
      </li>
        `
    }).join('')
    // console.log('strHtmls', strHtmls);
    elList.innerHTML = strHtmls
}

function onRemovePlace(placeId) {
    console.log('placeId', placeId);
    removePlace(placeId)
    renderPlaces()
    renderMarkers()
}

// Initialize and add the map
function initMap() {
    let user = getUser()
    let userLoc = null
    let userZoom = null
    if (user) {
        const { loc, zoom } = user
        userZoom = +zoom
        userLoc = loc
        if (userLoc === 1) {
            userLoc = null
            setTimeout(onPanToUserLoc, 1)
        }
    }
    console.log('userZoom', userZoom);
    console.log('userLoc', userLoc);
    // The location of Eilat
    const defaultLoc = { lat: 29.550360, lng: 34.952278 };
    // The map, centered at defaultLoc
    gMap = new google.maps.Map(document.querySelector(".map"), {
        zoom: userZoom || 16,
        center: userLoc || defaultLoc,
    });

    //Add new place on map click 
    gMap.addListener('click', ev => {
        console.log('ev', ev);
        const name = prompt('Place name?', 'New Place')
        // const { latLng: { lat, lng } } = ev
        //    const { latLng } = ev
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        console.log('lat, lng', lat, lng);
        addPlace(name, lat, lng, gMap.getZoom())
        renderPlaces()
        renderMarkers()
    })

    //Add my location button on the map 
    const locationButton = document.createElement('button')
    locationButton.classList.add('my-location')
    locationButton.innerHTML = `<img src="img/my-location.png" />`
    gMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton)
    locationButton.addEventListener('click', onPanToUserLoc)

    renderMarkers()
}

function onPanToPlace(placeId) {
    const { lat, lng, zoom } = getPlaceById(placeId)
    saveSelectedPlace({ lat, lng })
    gMap.setCenter({ lat, lng })
    gMap.setZoom(zoom)
}

function onPanToUserLoc() {
    navigator.geolocation.getCurrentPosition(setCenterToUserLoc)
}

function setCenterToUserLoc({ coords }) {
    const { latitude: lat, longitude: lng } = coords
    console.log('lat,lng', lat, lng);
    gMap.setCenter({ lat, lng })
}
// function setCenterToUserLoc(ev) {
//     console.log('ev', ev);
//     // const { latitude: lat, longitude: lng } = coords
//     // console.log('lat,lng', lat, lng);
//     // gMap.setCenter({ lat, lng })
// }


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

function onDownloadCSV(elLink) {
    const csvContent = getPlacesAsCSV()
    elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}