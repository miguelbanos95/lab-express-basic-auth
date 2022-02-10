const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
//es una regex que sirve para dar forma a nuestro email en este caso
const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i
const SALT_ROUNDS = 10

// TO DO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    //El email debe contener el formato del regex, por eso usamos el "match"
    match: EMAIL_PATTERN

  },
// la contraseña también debe tener un formato, ejemplo min.8 caracteres etc.
  password: {
    type: String,
    required: [true, 'Password is required'],
    match: [PASSWORD_PATTERN, 'Password must contain 8 chars!']
  }
});
//debemos encriptar la password antes de guardar al user, por eso usamos una funcion (pre)  
userSchema.pre('save', function(next){
  //creo esta const, para facilitar la lectura
  const user = this
  //si se ha modificado la password, lo debe hashear
  if(user.isModified('password')){
    bcrypt.hash(user.password, SALT_ROUNDS)
    .then((hash) => {
      user.password = hash
      //este next hace que cuando ya se ha encriptado la password, que realice el register
      next()
    }).catch(err => next(err))
  } else{
    next()
  }
})
userSchema.methods.checkPassword = function(password){
  return bcrypt.compare(password, this.password)
}
//asi guarda mongoose al modelo
const User = model("User", userSchema);
module.exports = User;
