'use strict';

let Router = require('koa-router');

let router = new Router();

let User = require('../models/user');


// router.post('/user', async(ctx, next) => {
//   try {
//     ctx.body = await User.create(ctx.request.body);
//   }
//   catch (err) {
//     ctx.status = 400;
//     ctx.body = err;
//   }
// });

exports.createUser = function (user) {
  return new Promise((resolve, reject)=>{
    User.create(user)
      .then(data=>{
        let zzz = data;
        return resolve(data);
      })
      .catch(err=>{
        let kkkk = err;
      });
  });
};




// Create endpoint /api/users for POST
// exports.postUsers = function(req, res) {
//     let user = new User({
//         username: req.body.username,
//         password: req.body.password
//     });
//
//     user.save(function(err) {
//         if (err)
//             res.send(err);
//
//         res.json({ message: 'New beer drinker added to the locker room!' });
//     });
// };
//
// // Create endpoint /api/users for GET
// exports.getUsers = function(req, res) {
//     User.find(function(err, users) {
//         if (err){
//           //return res.send(err);
//         }
//
//         //res.json(users);
//     });
// };
