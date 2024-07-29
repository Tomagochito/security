/* 1. Carga de variables de entorno */
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* 1. Módulo express-session */
const session = require('express-session');
/* 1. Referencia a los middlewares */
var authenticateSession = require('./middleware/authentication_session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

 /* 2. Configuración del middleware */
 app.use(session({
  secret: process.env.TOKEN_SECRET,
  name: 'session.security', 
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', authenticateSession, usersRouter);
// no se usa app.use('/template_login', template_loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/*
1 al inicio y 1 si el login esta mal  GET '/' -> carga la vista del login
3 si 2 esta bien                      GET '/users' -> carga la pagina principal
2                                     POST '/login' -> maneja control de acceso
                                      POST '/users' agrega un usuario
*/

/*
Navegador <-----------------------------------------------------------------------routes/index.js
                                    HTTP POST redirect'/users' 
                              cookie username=tomas || superadmin
          ---------------------------------------------->
                    HTTP GET '/users'
                cookie username=superadmin || tomas, puede ser otro, y se va a cambiar
*/