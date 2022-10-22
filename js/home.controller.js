function onInit() {
    const user = getUser()
    if (!user) return
    console.log('user', user);
    const { bgColor, textColor, name } = user
    const elBody = document.querySelector('body');
    const elH2 = document.querySelector('.greet')
    elBody.style.backgroundColor = bgColor
    elBody.style.color = textColor
    elH2.innerText = 'Welcome ' + name
}