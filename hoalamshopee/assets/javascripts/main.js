const signUpBtn = document.querySelectorAll('.header__navbar-item')[4]
const loginBtn = document.querySelectorAll('.header__navbar-item')[5]
const modal = document.querySelector('.modal')
const authFormSigUp = document.querySelectorAll('.auth-form')[0]
const authFormLogin = document.querySelectorAll('.auth-form')[1]
const controlsBackSigUp = document.querySelectorAll('.auth-form__controls-back')[0]
const controlsBackLogin = document.querySelectorAll('.auth-form__controls-back')[1]
const outModal = document.querySelector('.modal__overlay')


signUpBtn.onclick = function() {
    modal.classList.add('open')
    authFormSigUp.classList.add('open')
    authFormLogin.classList.remove('open')
}

loginBtn.onclick = function() {
    modal.classList.add('open')
    authFormLogin.classList.add('open')
    authFormSigUp.classList.remove('open')
}

outModal.onclick = function() {
    modal.classList.remove('open')
}

controlsBackSigUp.onclick = function() {
    modal.classList.remove('open')
}

controlsBackLogin.onclick = function() {
    modal.classList.remove('open')
}