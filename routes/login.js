'use strict';
const Router  = require('koa-router'),
  jwt         = require('jsonwebtoken');

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

    ctx.cookies.set('xsrf_token', '1234', {httpOnly: false});//токен, который будет передаваться в заголовке "X-CSRF-TOKEN"
    ctx.cookies.set('access_token', token, {httpOnly: true, secure: false});//токен, который будет использоваться в куках передаваемых на сервер при любом запросе


    //let kkk = ctx.cookies.get('foo');

    ctx.body = {user: user.displayName, token: 'JWT ' + token};




    //куки
    //http://www.tutorialspoint.com/koajs/koajs_cookies.htm
    //http://www.w3ii.com/ru/koajs/koajs_cookies.html
  }
});

router.get('/login', (ctx, next) => {
  let kkkkkk = ctx.cookies.get('access_token');
  let ssssss = ctx.cookies.get('csrf_token');
  ctx.render('login', {
    title: 'Login'
  }, true)
});



module.exports = router;
