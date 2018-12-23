'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const usuarioSchema = mongoose.Schema({ // https://mongoosejs.com/docs/schematypes.html
  nombre: String,
  email: String,
  clave: String
});

// creamos el modelo
const Usuario = mongoose.model('Usuarios', usuarioSchema);

// exportamos el modelo (opcional)
module.exports = Usuario;
