var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var AuthsCtrl       = require('../controllers/auth');
var movieCtrl       = require('../controllers/movies');


// root path:
router.get('/', pagesController.welcome);

// users resource paths:
router.post('/login',                              AuthsCtrl.userAuth);
router.get('/users',                               usersController.index);
router.post('/users',                              usersController.create);
router.get('/users/:id',    AuthsCtrl.tokenVerify, usersController.show);
router.put('/users/:id',    AuthsCtrl.tokenVerify, usersController.update);
router.delete('/users/:id', AuthsCtrl.tokenVerify, usersController.userDelete);

// post and remove reels from watchlist
router.post('/users/:id/watchlist',                usersController.addToWatchlist)
router.put('/users/:id/watchlist',                 usersController.removeFromWatchlist)

// retrieving api data
router.get('/movie', movieCtrl.movies);
router.get('/tv', movieCtrl.tv);
router.get('/search', movieCtrl.search);

module.exports = router;
