const jwt = require('jsonwebtoken');
const config = require('./../config');
const User = require('./../models/user');

/**
 *  The Auth Checker middleware function.
 */

module.exports = (req, res, next) => {
  try {

    if (!(req.headers && req.headers.authorization) && !(req.cookies && req.cookies.authorization) && !req.headers.cookie) {
      return res.status(401).send('Invalid credentials').end();
    }

    let token = (
      req.headers && req.headers.authorization ?
        req.headers.authorization.split(' ')[1] :
        req.cookies && req.cookies.authorization
    ) || (
        req.headers.cookie.split('authorization=')[1]
      );

    // decode the token using a secret key-phrase
    jwt.verify(token, config.jwt.jwtSecret, async (err, decoded) => {
      // the 401 code is for unauthorized status
      console.log('errrrrrr', err);
      if (err) {
        return res.status(401).send('Invalid credentials').end()
      }

      const uid = decoded.sub
      console.log('uid--------', uid);
      const user = await User.findOne({ _id: uid });
      console.log('user---------', user);
      if (user) {
        req.user = user
        next()
      } else {
        return res.status(401).send('Invalid credentials').end()
      }
    })
  } catch (e) {
    return res.status(500).send('Server Error').end()
  }
}
