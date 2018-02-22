'use strict';

let Router = require('koa-router');

let router = new Router();


router.get('/', (ctx, next) => {
  ctx.render('index', {
    title: 'Авторизация'
  }, true)
});

module.exports = router;
