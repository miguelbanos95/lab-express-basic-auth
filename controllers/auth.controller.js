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

    //vamos a crear una funcion que renderice con errores para simp. codigo
    const renderWithErrors = (errors) => {
        res.render('auth/register', {
            errors: errors,
            user: user
        })
    }

    /* vamos a comprobar que el usuario que se registra no usa un email ya registrado en la db.
    Con lo cual vamos a pintar el error en el caso que ya haya un email ya en uso.*/
    User.findOne({ email: email })
        .then((userFound) => {
            if (userFound) {
                renderWithErrors({ email: "Email already used" })
            } else {
                return User.create(user).then(() => { res.redirect('/') })
            }

        }).catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                //renderizamos otra vez la vista pero con los errores que el user haya cometido
                renderWithErrors(err.errors)
            } else {
                next(err)
            }
        })
}
//PINTA EL LOGIN
module.exports.login = (req, res, next) => {
    res.render('auth/login')
}

// // module.exports.doLogin = (req, res, next) => {
    
// // }