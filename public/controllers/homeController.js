(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('HomeController', HomeController);

    HomeController.$inject = ["$state", "userDataService", "$log", "$http","$window","movieService"]

    function HomeController($state, userDataService, $log, $http, $window, movieService) {
      var vm = this;

      //Movie Lists
      vm.featuredMovies = [];
      vm.topMovies = [];
      vm.popularMovies = [];
      vm.recommendedMovies = [];
      vm.callToSelectedMovie = callToSelectedMovie;

      //Tv List
      vm.popularTv = [];

      //Invoke functions to display movies on home page
      getFeaturedMovies();
      getTopMovies();
      getPopularMovies();
      getRecommendedMovies();
      getPopularTv();

      function callToSelectedMovie(category, movie, type, genre){
        movieService.SelectedMovie = movie;
        movieService.SelectedMovieType = type;
        movieService.SelectedCategory = category;
        movieService.SelectedGenre = genre;
      }

      function getFeaturedMovies() {
        $http.get('/movie?featured')
          .then(function(res) {
            if (res.data.status_code === 34 || res.data.backdrop_path === null) {
              getFeaturedMovies();
            } else {
              vm.featuredMovies = res;
              vm.featuredMovies.title = res.data.title;
              vm.featuredMovies.overview = res.data.overview;
              vm.movieImage = res.data.backdrop_path;
              return vm.movieImage;
            }
            }, function(err) {
            console.error('Error retrieving movie');
          })
          .then(function(res) {
            $('.jumbotron.home').css('background-image', `url(https://image.tmdb.org/t/p/original${res})`);
          }, function(err) {
            console.error('Error');
          })
      }

      function getTopMovies() {
          return $http.get('/movie?topRated')
            .then(function(res) {
              vm.topMovies = res.data.results;
            }, function(err) {
              console.error('Error');
            })
      }

      function getPopularMovies() {
          $http.get('/movie?popular')
            .then(function(res) {
              vm.popularMovies = res.data.results;
            }, function(err) {
              console.error('Error');
            })
      }

      function getRecommendedMovies() {
          $http.get('/movie?recommended')
            .then(function(res) {
              if(res.data.status_code === 34 || res.data.status_code === 11 || res.data.total_results === 0) {
                getRecommendedMovies();
              }
              vm.recommendedMovies = res.data.results;
            }, function(err) {
              console.error('Error');
            })
      }


      // =================================
      //Tv Functions
      function getPopularTv() {
        $http.get('/tv?popular')
          .then(function(res) {
            vm.popularTv = res.data.results;
          }, function(err) {
            console.error('Error');
          })
      }
  }
})();
