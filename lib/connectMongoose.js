'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('Error de conexión', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

// conectamos con la BBDD practicanode
mongoose.connect('mongodb://localhost/practicanode', { useNewUrlParser: true });

module.exports = mongoose.connection;
