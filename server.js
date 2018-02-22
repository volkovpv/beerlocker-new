'use strict';

const path      = require('path'),
  crypto        = require('crypto'),                  // модуль node.js для выполнения различных шифровальн
  Koa           = require('koa'),
  bodyParser    = require('koa-bodyparser'),          // парсер для POST запросов
  serve         = require('koa-static'),              // модуль, который отдает статические файлы типа style.css из заданной директории
  logger        = require('koa-logger'),              // опциональный модуль для логов сетевых запросов. Полезен при разработке.
  Pug           = require('koa-pug'),                 // шаблонизатор для Pug
  passport      = require('koa-passport'),            // реализация passport для Koa
  mongoose      = require('mongoose'),                // драйвер для MongoDB
  LocalStrategy = require('passport-local'),          // локальная стратегия авторизации
  JwtStrategy   = require('passport-jwt').Strategy,   // авторизация через JWT
  ExtractJwt    = require('passport-jwt').ExtractJwt, // авторизация через JWT
  jwt           = require('jsonwebtoken'),            // аутентификация по JWT для http
  socketioJwt   = require('socketio-jwt');            // аутентификация по JWT для socket.io


let log     = require('./app/log')(module),
  config    = require('./app/config'),
  index     = require('./routes/index'),
  beer      = require('./routes/beer'),
  user      = require('./routes/user'),
  login     = require('./routes/login');

const jwtsecret = "mysecretkey";

const app = new Koa(),
  pug     = new Pug({
    viewPath    : path.resolve(__dirname, 'views'),
    debug       : true,
    app         : app
  });

mongoose.Promise = Promise;   // Просим Mongoose использовать стандартные Промисы
mongoose.set('debug', true);  // Просим Mongoose писать все запросы к базе в консоль. Удобно для отладки кода
mongoose.connect('mongodb://localhost:27017/beerlocker');

app.use(serve('public'));
app.use(logger());
app.use(bodyParser());
app.use(passport.initialize());
app.use(index.routes());
app.use(beer.routes());
app.use(user.routes());
app.use(login.routes());
//https://stackoverflow.com/questions/30285683/how-can-i-split-my-koa-routes-into-separate-files  маршрутизация

module.exports = app;
