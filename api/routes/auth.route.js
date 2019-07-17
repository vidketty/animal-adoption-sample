const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('./../config');

routes.route('/login').post((req, res) => {

  const { email, password } = req.body;

  User.findOne({ email }, function (err, userRes) {

    if (err) return res.status(400).send('Server error');

    if (!userRes) return res.status(404).send('User not found');

    bcrypt.compare(password, userRes.password, async (err, result) => {
      if (!result) {
        return res.status(401).send('Invalid Credentials');
      } else {

        const payload = {
          sub: userRes._id
        };

        // create a token string
        const token = jwt.sign(payload, config.jwt.jwtSecret)

        req.user = userRes;
        let user = userRes.toJSON();
        delete user.password;
        delete user.__v;
        res.cookie('authorization', token, { maxAge: config.jwt.maxAge })

        return res.status(200).json({
          success: true,
          message: 'user login successfully',
          token,
          user
        })
      }
    });
  });
});

module.exports = routes;