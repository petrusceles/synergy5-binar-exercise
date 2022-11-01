// const http = require('http')

const login = document.querySelector('.login');
if (login) {
    login.addEventListener('click', () => {
        document.location.href = "http://localhost:7000/"
    })
}

const logout = document.querySelector('.logout');

if (logout) {
    logout.addEventListener('click', () => {
        document.location.href = "http://localhost:7000/login"
    })
}