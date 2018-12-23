'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Usuario = require('../../models/Usuarios');

/** 
 * POST /usuarios/login
 * Se realiza el login de un usuario y se devuelve el TOKEN
 */
router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email;
    const clave = req.body.clave;
    // buscamos el usuario
    const usuario = await Usuario.findOne({ email: email }).exec();
    
    // Si no encontramos el usuario informamos del error
    if (!usuario) {
      res.render('login', {
        title: res.__('Title3'),
        message1: res.__('User not exist'),
        message2: res.__('User not exist')
    });
      return;
    }

    // Convertimos la clave con bcrypt
    bcrypt.compare(clave, usuario.clave, (err, same) => {
      if (err) {
        next(err);
        return;
      }
      if (!same) {
        res.json({ success: false, error: res.__('Invalid Credentials')});
      }  
      return;
    });
    
    // crear un token
    jwt.sign({ user_id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    }, (err, token) => {
      if (err) {
        next(err);
        return;
      }
      res.json({ success: true, message: res.__('Sucessful access') + token});
    });

  } catch(err) {
    next(err);
    return;
  }
});

/**
 * POST /register
 * Crea un usuario en la base de datos
 */
router.post('/register', async (req, res, next) => {
  try {
    // recuperamos los datos del usuario enviados desde la web    
    var userData = req.body;
    
    // buscamos el usuario
    const usuario = await Usuario.findOne({ email: userData.email }).exec();

    // Comprobamos si ya existe en la BBDD
    if (!usuario) {
      try {
        if (!userData.nombre) {
          res.render('login', {
            title: res.__('Title3'),
            message1: 'ERROR',
            message2: res.__('Nombre empty')
        });
          return;
            }
        if (!userData.email) {
          res.render('login', {
            title: res.__('Title3'),
            message1: 'ERROR',
            message2: res.__('Email empty')
        });
          return;
            }

        if (!userData.clave) {
          res.render('login', {
            title: res.__('Title3'),
            message1: 'ERROR',
            message2: res.__('Clave empty')
        });
          return;
            }
          // Transformamos la clave para almacenarla
          bcrypt.hash(userData.clave, saltRounds, function(err, hash) {
          // creamos un usuario en memoria (objeto de tipo Usuario)
          const usuario = new Usuario({
            nombre: userData.nombre,
            email: userData.email,
            clave: hash});
        
          // lo guardamos en BD
          usuario.save();
      
          res.render('login', {
            title: res.__('Title3'),
            message1: res.__('User created'),
            message2: usuario
        });
        });    
      } catch (err) {
        next(err);
        return;
      }
      return;
    } else {
      res.render('login', {
        title: res.__('Title3'),
        message1: 'ERROR',
        message2: res.__('User Exists')
    });
      return;
    }

  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;