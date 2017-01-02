(function(){
  'use strict';

  angular
    .module('webReels')
    .controller('WatchListController', WatchListController);

  WatchListController.$inject = ["$state", "$http", "movieService", "authToken", "userDataService"];

  function WatchListController($state, $http, movieService, authToken, userDataService) {
    var vm = this;

    vm.watchList = [];
    vm.token = authToken.getToken();

    //Function to add selected watchlist movie to showpage
    vm.callToSelectedWatchListMovie = callToSelectedWatchListMovie;

    getWatchList();

    function getWatchList(){
      var id = userDataService.user._id;
      $http.get('/users/' + id + '?token=' + vm.token)
      .then(function(res){
        return res;
      }, function(err) {
        console.error('error attaining user info',err);
      })
      .then(function(res){
        res.data.watchlist.forEach(function(reel,index){
          $http.get(`/${reel.media}?popular[movieId]=${reel.id}`)
          .then(function(res){
            vm.watchList.push(res.data);
          }, function(err) {
            console.error('error with movie list', err);
          })
        })
      }, function(err) {
          console.error('error with initiating loop', err);
        })
      }

      function callToSelectedWatchListMovie(movie, type, genre){
        movieService.SelectedMovie = movie;
        movieService.SelectedMovieType = type;
        if(movie.title){
          movieService.SelectedCategory = 'movie';
        }else{
          movieService.SelectedCategory = 'tv';
        }
        movieService.SelectedGenre = genre;
      }

    }
})();
