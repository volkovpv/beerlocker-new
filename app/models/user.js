'use strict';

let mongoose  = require('mongoose'),
  bcrypt      = require('bcrypt-nodejs'),
  crypto      = require('crypto');

const UserSchema = new mongoose.Schema({
    displayName: String,
    email: {
      type      : String,
      required  : 'Укажите e-mail',
      unique    : 'Такой e-mail уже существует'
    },
    passwordHash: String,
    salt        : String,
  }, {
    timestamps: true
});

UserSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function () {
    return this._plainPassword;
  });

UserSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString('base64') === this.passwordHash;
};


// let UserSchema = new mongoose.Schema({
//     username: {
//         type    : String,
//         unique  : true,
//         required: true
//     },
//     password: {
//         type    : String,
//         required: true
//     }
// });

// UserSchema.pre('save', function(callback) {
//     let user = this;
//
//     // Break out if the password hasn't changed
//     if (!user.isModified('password')) return callback();
//
//     // Password changed so we need to hash it
//     bcrypt.genSalt(5, function(err, salt) {
//         if (err) return callback(err);
//
//         bcrypt.hash(user.password, salt, null, function(err, hash) {
//             if (err) return callback(err);
//             user.password = hash;
//             callback();
//         });
//     });
// });

// UserSchema.methods.verifyPassword = function(password, cb) {
//     bcrypt.compare(password, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
