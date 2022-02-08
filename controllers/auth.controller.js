//Se encarga de autenticar mi usuario
//Es un controlador especifico que se encarga de pintar el registro, hacer el registro.
// Pintar el login, hacer el login

const User = require('../models/User.model')
const mongoose = require('mongoose')

//pinta el register 
module.exports.register = (req, res, next) => {
    res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {
    //le estoy mandando al navegador lo que me llega del formulario
    //user = solamente a name, email y un password, si tiene mas elementos, no entran 
    const user = { name, email, password } = req.body; 
    User.create(user)
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => next(err))
}