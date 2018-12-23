'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anuncioSchema = mongoose.Schema({ // https://mongoosejs.com/docs/schematypes.html
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});

// creamos el modelo
const Anuncio = mongoose.model('Anuncios', anuncioSchema);

// exportamos el modelo (opcional)
module.exports = Anuncio;