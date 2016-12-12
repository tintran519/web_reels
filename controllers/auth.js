var User        = require('../models/user.js'),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;

//===========
//Authenticate user

var userAuth = function (req, res, next) {
  // find the user
  User.findOne({
    email: req.body.email
    }).select('email password name').exec(function(err, user) {

      if (err) throw err;

      // if no user w/ the listed email found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        // check if pw matches
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {

          // if user is found and pw matches
          // create a token
          var token = jwt.sign({
            email: user.email,
            name:  user.name,
            _id:   user._id
          }, topSecret, {
            expiresIn: '30d' // token expires in 30 days
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user
          });
        }
      }
  });
};

//=============
// Verify Token
var tokenVerify = function(req, res, next) {
  // do logging
  console.log('Somebody just accessed the api')

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.header['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, topSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for user in other routes
        req.decoded = decoded;

        next(); // make sure to go to next routes after
      }
    });
  } else {

    //if there is no token
    //return an HTTP response of 403(access forbidden) and error message
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

module.exports = {
  userAuth: userAuth,
  tokenVerify: tokenVerify
};
