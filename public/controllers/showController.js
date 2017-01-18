(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('ShowController', ShowController);

    ShowController.$inject = ["movieService", "$http", "$sce", "$state", "userDataService", "authToken"]

    function ShowController(movieService, $http, $sce, $state, userDataService, authToken) {
      var vm = this;

      //Function to parse youtube link
      vm.parseTrailer = parseTrailer;

      //Selected movie info
      vm.SelectedMovie = movieService.SelectedMovie;
      vm.MovieId = movieService.SelectedMovie.id;
      vm.MovieCategory = movieService.SelectedMovieType;
      vm.MediaCategory = movieService.SelectedCategory;
      vm.GenreId = movieService.SelectedGenre;

      //Get user token
      vm.token = authToken.getToken();

      //user watchlist
      vm.watchList;

      //Array that stores movie
      vm.movieInfo = [];

      //Related Reels
      vm.relatedInfo;
      vm.callToRelatedSelected = callToRelatedSelected;

      //Functions to run when page loads to display movies
      getMovieInfo();
      getRelatedInfo();

      //Retrieve user's watchlist
      getWatchList();

      //Add & remove movie to/from watchlist
      vm.addToWatchList = addToWatchList;
      vm.removeReelFromWatchList = removeReelFromWatchList;

      console.log('selected movie', movieService.SelectedMovie)

      //boolean to check if reel is in watchlist
      vm.alreadyInWatchList;

      //function for carousel; must set timeout to allow angular elements to load
      setTimeout (function() {
        owl();
      },2000)

      function getMovieInfo() {
        $http.get(`/${vm.MediaCategory}?${vm.MovieCategory}[movieId]=${vm.MovieId}`)
          .then(function(res) {
            vm.movieInfo = res.data;
          }, function(err) {
            console.error('error')
          })
      }

      function getRelatedInfo() {
        $http.get(`/${vm.MediaCategory}?related[genreId]=${vm.GenreId}`)
          .then(function(res) {
            vm.relatedInfo = res.data.results;
          }, function(err) {
            console.error('error')
          })
      }

      function callToRelatedSelected(category, movie, type, genre){
        movieService.SelectedMovie = movie;
        movieService.SelectedMovieType = type;
        movieService.SelectedCategory = category;
        movieService.SelectedGenre = genre;
        $state.go('showPage',{},{reload:true})
      }

      function addToWatchList(){
        var id = userDataService.user._id;
        $http.post('/users/' + id + '/watchlist', {
          id: vm.MovieId,
          media: vm.MediaCategory
        }).then(function(){
          $state.go('showPage',{},{reload:true})
        });
      }

      function removeReelFromWatchList(){
        var id = userDataService.user._id;
        $http.put('/users/' + id + '/watchlist' + '?token=' + vm.token, {
          id: vm.MovieId,
          media: vm.MediaCategory
        }).then(function(){
          $state.go('showPage',{},{reload:true})
        })
      }

      function getWatchList(){
        var id = userDataService.user._id;
        $http.get('/users/' + id + '?token=' + vm.token)
        .then(function(res){
          vm.watchList = res.data.watchlist;
          checkReel(vm.MovieId,vm.MediaCategory);
        }, function(err) {
          console.error('error attaining user info',err);
        })
      }

      function checkReel(reelId,reelMedia){
        var found = vm.watchList.some(function (el){
          return el.id === reelId && el.media === reelMedia;
          })
        vm.alreadyInWatchList = found;
      }

      function parseTrailer(link){
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + link);
      }

      function owl() {
        $(".owl-carousel").owlCarousel({
          loop:true,
          margin:12,
          nav:false,
          dots:true,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:3
              },
              1000:{
                  items:5
              }
            }
        });
      };
    }
})();
