// Require resource's model(s).
var User = require("../models/user");
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    topSecret = env.topSecret;

// Add to watchlist
var addToWatchlist = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.send(err);

    var movie = {
      id: req.body.id,
      name: req.body.name,
      image_url: req.body.image_url
    }

    user.watchlist.push(movie);

    user.save(function(err, savedUser){
      if (err) {
        res.send(err)
      }
      console.log('movie added to watchlist');
      res.json(savedUser);
    })
  })
  // get user by id
  // req.body should contain movie { id,name,image_url } to add to watchlist
  // add movie object { id,name,image_url } to user.watchlists array
  // save
}
//===============
//Get all users
var index = function(req, res){
  User.find({}, function(err, users) {
    if (err) res.send(err);

    // return the users
    res.json(users);
  });
};
//===============
//Get a user
var show = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.send(err);

    // return that user
    res.json(user);

  });
};
//===============
//Create User
var create = function(req, res) {
  var user        = new User(); //create a new instance of user model
  user.name       = req.body.name; //set the users name
  user.email      = req.body.email; //set users email
  user.password   = req.body.password; //set the users pw

  user.save(function(err, newUser) {
    if (err) {
      //duplicate entry
      if(err.code == 11000)
        return res.json({ success: false, message: 'A user with that info already exists!' })
      else
        return res.json(err);
    }

      var token = jwt.sign({
        email: newUser.email,
        name:  newUser.name,
        _id:   newUser._id
      }, topSecret, {
        expiresIn: '30d'
      })

      //return a message after token created
      res.json({
        message: "Welcome to Web Reels!",
        user: newUser,
        token: token
      });
    });
};
//================
//Update user
var update = function(req, res) {
  User.findById(req.params.id, function(err, user) {

      if (err) res.send(err);

      //set the new user information if it exists in the req
      if (req.body.name)      user.name     = req.body.name;
      if (req.body.email)     user.email    = req.body.email;
      if (req.body.password)  user.password = req.body.password;

      //save the user
      user.save(function(err) {
        if (err) res.send(err);

        //return a message
        res.json({ message: 'User updated!'})
      });
  });
}
//===============
//Delete User
var userDelete = function(req, res) {
  User.remove({
         _id: req.params.id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'User successfully delete' });
  });
}

//===============
module.exports = {
  index:      index,
  show:       show,
  create:     create,
  update:     update,
  userDelete: userDelete,
  addToWatchlist: addToWatchlist
};
