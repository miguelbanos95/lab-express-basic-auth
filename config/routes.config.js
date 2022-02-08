const express = require('express');
const router = express.Router();

//common significa todos aquellos componentes que no se refieren a un modelo en concreto
//por ejemplo pintar la home... no es pintar una lista de movies. no se refiere a una accion en concreto.
//pinta vistas normalmente
//puedo poner el nombre que quiera a esta constante 
const common = require('../controllers/common.controller');
//estoy trayendo los controladores especificos para la autenticación 
const auth = require('../controllers/auth.controller')

//COMMON ROUTES 
router.get('/', common.home);
//router.get('/', common.home="(req, res, next) => { res.render('common/home'))}"

//AUTH ROUTES
router.get('/register', auth.register)
router.post('/register', auth.doRegister)






module.exports = router;