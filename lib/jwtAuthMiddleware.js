'use strict';

const jwt = require('jsonwebtoken');

// función que crea un middleware de autenticación JWT
module.exports = () => {
  return (req, res, next) => {
    // recogemos el token
    const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-token');

    if (!token) {
      const err = new Error(res.__('Empty Token'));
      err.status = 401;
      next(err);
      return;
    }

    // verificamos el token
    jwt.verify(token, process.env.JWT_SECRET, (err, tokenDescodificado) => {
      if (err) {
        next(new Error(res.__('Error Token')));
        return;
      }
      req.user_id = tokenDescodificado.user_id;
      next();
    });

  };
};
