//este controlador sirve para guardar todas esas acciones en una constante para evitar repetir código
//cuando exporte el module con clave home será iguala a esta función.

module.exports.home = (req, res, next) => {
    res.render('common/home')
}

module.exports.profile = (req, res, next) => {
    res.render('common/profile')
}