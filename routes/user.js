'use strict';

let Router = require('koa-router');

let router = new Router();

let user = require('../app/controllers/user');

router.post('/user', async(ctx, next) => {
  try {
    //ctx.body = await user.createUser(ctx.request.body);

    ctx.render('user', {
      title: 'Пользователь зарегистрирован',
      resData: await user.createUser(ctx.request.body)
    }, true)
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.get('/user', (ctx, next) => {
  ctx.render('user', {
    title: 'Регистрация нового пользователя.'
  }, true)
});

module.exports = router;
