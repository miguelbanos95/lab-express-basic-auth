const { Schema, model } = require("mongoose");
//es una regex que sirve para dar forma a nuestro email en este caso
const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //El email debe contener el formato del regex, por eso usamos el "match"
    match: EMAIL_PATTERN

  },
// la contraseña también debe tener un formato, ejemplo min.8 caracteres etc.
  password: {
    type: String,
    required: true,
    match: PASSWORD_PATTERN
  }
});

//asi guarda mongoose al modelo
const User = model("User", userSchema);

module.exports = User;
