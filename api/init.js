const User = require('./models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userCredentials = require('./config').defaultUser;

module.exports = init = (() => {
  User.findOne(({
    email: userCredentials.email
  }), (err, user) => {
    if (!user) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(userCredentials.password, salt, function (err, hash) {

          const userObj = new User({
            email: userCredentials.email,
            password: hash
          });

          userObj.save((err, user) => {
            console.log('admin user created with email: ' + userCredentials.email);
          })
        });
      });
    } else {
      console.log('admin user already created with email: ' + userCredentials.email);
    }
  })
})