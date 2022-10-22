function getFormData(ev) {
    ev.preventDefault()
    console.log('ev', ev);
    const elForm = ev.target
    const formData = new FormData(elForm)
    const user = Object.fromEntries(formData)
    console.log('user', user);
    if (user.loc === 'First saved location' || user.loc === 'Random saved location') {
        const places = getPlaces()
        if (places.length) {
            let idx = 0
            if (user.loc.includes('Random')) idx = getRandomIntInclusive(0, places.length - 1)
            const { lat, lng } = places[idx]
            user.loc = { lat, lng }
        }
    } else if (user.loc === 'Last selected saved location') {
        const loc = getSelectedPlace()
        if (loc) user.loc = loc
    } else if (user.loc === 'Current location') {
        user.loc = 1
    } else {
        //User input (xx,xx)
        22, 22
        // with the regex pattern
        if (!user.loc) return
        const [lat, lng] = user.loc.split(',')// [24,22] -> lat = 24 , lng =22
        user.loc = { lat: +lat, lng: +lng }

        //without the pattern
        // if (user.loc.length >= 3 && user.loc.includes(',')) {
        //     const [lat, lng] = user.loc.split(',')
        //     console.log('lat, lng', lat, lng);
        //     if (lat > 90 || lng > 90) {
        //         alert('must enter num  between 0 - 90 each')
        //         return
        //     }
        //     user.loc = { lat: +lat, lng: +lng }
        //     console.log('user.loc', user.loc);
        // } else {
        //     alert('must enter num  between 0 - 90 each')
        //     return
        // }
    }
    if (typeof user.loc === 'string') user.loc = null
    // console.log('user:', user)
    saveUser(user)
    elForm.reset()
}

function renderValue({ value }) {
    const elSpan = document.querySelector('.rangeValue')
    elSpan.innerText = value
    console.log('value', value);
}

function onInit() {
    const user = getUser()
    if (!user) return
    const { bgColor, textColor } = user
    const elBody = document.querySelector('body');
    elBody.style.backgroundColor = bgColor
    elBody.style.color = textColor
}