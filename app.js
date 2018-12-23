var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require('i18n');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRouter = require('./routes/apiv1/usuarios');

var app = express();

// configuracion i18n (modulo multilanguaje)
// i18n setup (multi-language module)
i18n.configure({
  locales:['en', 'es'],
  defaultLocale: 'es',
  directory: __dirname + '/locales'
});

// i18n iniciado
// i18n start
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// conectamos a la base de datos y definimos los modelos
require('./lib/connectMongoose');
require('./models/Anuncios');
require('./models/Usuarios');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.tituloWebSite = 'NodePOP';

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * Rutas de mi API
 */
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));
app.use('/usuarios', require('./routes/apiv1/usuarios'));
app.use('/anuncios', require('./routes/apiv1/anuncios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
