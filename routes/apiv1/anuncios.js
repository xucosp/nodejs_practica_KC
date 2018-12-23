'use strict';

var fs = require('fs');
const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncios');
const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware');

router.use( jwtAuthMiddleware());

/**
 * GET /anuncios
 * Obtener una lista de anuncios con los filtros mencionados en el README.md
 */
router.get('/', (req, res, next) => {

  // datos de entrada
  const nombre = req.query.nombre;
  const venta = req.query.venta;
  const tag = req.query.tag;
  const precioMax = parseInt(req.query.precioMax);
  const precioMin = parseInt(req.query.precioMin);
  const precio = {$gte:precioMin, $lte:precioMax};
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const sort = req.query.sort;

  const filter = {};

  // búsqueda por nombre
  if (nombre) {
    filter.nombre = new RegExp('^' + nombre, "i");;
  }

  // búsqueda por venta
  if (venta) {
    filter.venta = venta;
  }

  // búsqueda por tag
  if (tag) {
    filter.tags = tag;
  };

  // calculo rango precio
  if (precioMax) {
    if (precioMin) {
      filter.precio = precio  
    } else {
      filter.precio = {$gte:0, $lte:precioMax};
    };
  } else {
    if (precioMin) {
      filter.precio = {$gte:precioMin};  
    }
  };

  const query = Anuncio.find(filter);

  query.limit(limit);
  query.skip(skip);
  query.sort(sort);

  query.exec((err, lista) => {
    if (err) {
      next(err);
      return;
    }
      res.render('index', {
        title: res.__('Title'),
        articulos: lista
    });
  });
});


/**
 * GET /anuncios/tags/
 * Obtener un anuncio buscando por id
 */
router.get('/tags', async (req, res, next) => {

  try {
    await Anuncio.find().distinct('tags', (err, tags) => {
        res.json({
          title: res.__('Title2'),
          tags: tags
      });

    });
  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;
