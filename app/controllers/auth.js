'use strict';

const passport      = require('koa-passport'),
  LocalStrategy = require('passport-local'),
  ExtractJwt    = require('passport-jwt').ExtractJwt,
  JwtStrategy   = require('passport-jwt').Strategy;

const User = require('../models/user');

const jwtsecret = "mysecretkey";

const optLocalStrategy = {
  usernameField: 'email',
  passwordField: 'password',
  session: false
};

const optJwtStrategy = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey   : jwtsecret
};

passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser();
    done(null, user)
  } catch(err) {
    done(err)
  }
});

const fetchUser = ((...dove) => {
  // This is an example! Use password hashing in your project and avoid storing passwords in your code
  const user = { id: 1, username: 'test', password: 'test' };
  return async function() {
    return user
  }
})();







function checkLocalStrategy(email, password, done) {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user || !user.checkPassword(password)) {
      return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
    }
    return done(null, user);
  });
}

function checkJwtStrategy(payload, done) {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err)
    }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
}

passport.use(new LocalStrategy(optLocalStrategy, checkLocalStrategy));
passport.use(new JwtStrategy(optJwtStrategy,     checkJwtStrategy));




// router.post('/login', async(ctx, next) => {
//   await passport.authenticate('local', function (err, user) {
//     if (!user) {
//       ctx.body = "Login failed";
//     } else {
//       //--payload - информация которую мы храним в токене и можем из него получать
//       const payload = {
//         id: user.id,
//         displayName: user.displayName,
//         email: user.email
//       };
//       const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
//
//       ctx.body = {user: user.displayName, token: 'JWT ' + token};
//     }
//   })(ctx, next);
// });





exports.isAuthenticated = passport.authenticate('local');
