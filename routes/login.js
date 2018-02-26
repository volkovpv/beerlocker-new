'use strict';
const Router  = require('koa-router'),
  jwt         = require('jsonwebtoken'),
  KJUR        = require('jsrsasign');

let router = new Router();

let user = require('../app/controllers/user'),
  auth = require('../app/controllers/auth');

const jwtsecret = "mysecretkey";

router.post('/login', auth.isAuthenticated, function (ctx, next) {
  let user = ctx.req.user;
  if (!user) {
    ctx.body = "Login failed";
  } else {

    const tNow = KJUR.jws.IntDate.get('now');
    const tEnd = KJUR.jws.IntDate.get('now + 1day');

    const SECRET_KEY = 'cAtwa1kkEy';

    const accessHeader ={
      typ: 'JWT', //denotes the type (shorthand typ) of token this is
      alg: 'HS256' //denotes the algorithm (shorthand alg) used for the  signature is HMAC SHA-256

    };

    const accessPayload = {
      jti: user.id,
      sub: user.email,
      nbf: tNow,
      exp: tEnd
    };

    const accessStringHeader = JSON.stringify(accessHeader);
    const accessStringPayload = JSON.stringify(accessPayload);

    const accessSignature = KJUR.jws.JWS.sign("HS256", accessStringHeader, accessStringPayload, SECRET_KEY);



    //let kkkkk = KJUR.utf8tob64u(JSON.stringify(header));

    //let jjjj = JSON.parse(KJUR.b64utoutf8(kkkkk));

    let zzzz = accessSignature;

    //const




    //const unsignedToken = rs(header);




    const token = `${KJUR.utf8tob64u(accessStringHeader)}.${KJUR.utf8tob64u(accessStringPayload)}.${KJUR.utf8tob64u(accessSignature)}`; //jwt.sign(accessStringPayload, jwtsecret); //здесь создается JWT

    ctx.cookies.set('xsrf_token', '1234', {httpOnly: false});//токен, который будет передаваться в заголовке "X-CSRF-TOKEN"
    ctx.cookies.set('access_token', token, {httpOnly: true, secure: false});//токен, который будет использоваться в куках передаваемых на сервер при любом запросе
    ctx.body = {user: user.displayName, token: 'JWT ' + token};
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
