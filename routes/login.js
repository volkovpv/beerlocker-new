'use strict';
let Router = require('koa-router'),
  jwt           = require('jsonwebtoken');

let router = new Router();

let user = require('../app/controllers/user'),
  auth = require('../app/controllers/auth');

const jwtsecret = "mysecretkey";

router.post('/login', auth.isAuthenticated, function (ctx, next) {
  let user = ctx.req.user;
  if (!user) {
    ctx.body = "Login failed";
  } else {
    //--payload - информация которую мы храним в токене и можем из него получать
    const payload = {
      id: user.id,
      //displayName: user.displayName,
      email: user.email
    };
    const token = jwt.sign(payload, jwtsecret); //здесь создается JWT

    ctx.body = {user: user.displayName, token: 'JWT ' + token};

    //куки
    //http://www.tutorialspoint.com/koajs/koajs_cookies.htm
    //http://www.w3ii.com/ru/koajs/koajs_cookies.html
  }
});

router.get('/login', (ctx, next) => {
  ctx.render('login', {
    title: 'Login'
  }, true)
});



module.exports = router;
