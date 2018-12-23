'use strict';

const fs = require('fs');
const express = require('express');
const router = express.Router();

const Anuncio = require('./models/Anuncios');
const Usuario = require('./models/Usuarios');

// Conectar a la BBDD
const mongoose = require('./lib/connectMongoose');

reloadDB();

/**
 * Cargar anuncios iniciales en la BBDD
 */
async function reloadDB() {
  try {
    // Drop Database
    mongoose.dropDatabase();
    // Llamada a la carga de datos del json
    const json = await loadJSON();
    await saveDB(json);
    process.exit();
  } catch (error) {
    console.log('Error en la carga inicial', error);
  }
}

// Funcion de carga del json
async function loadJSON() {
  return new Promise((resolve, reject) => {
    fs.readFile('./carga_inicial.json', async (err, data) => {
      if (err) {
        reject();
      }
      const json = await JSON.parse(data);
      resolve(json);
    });
  });
}

// Insertar anuncion en la BBDD
async function saveDB(json) {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        await Anuncio.insertMany(json.anuncios);
        resolve();
      })();
    } catch (error) {
      reject();
    }
  });
}

module.exports = router;