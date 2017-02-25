(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('HomeController', HomeController)

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


      //function for carousel; must set timeout to allow angular elements to load
      setTimeout (function() {
        owl();
      },4000)

      //function to save info on selected movie on home screen & display on show page
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
              }else{
              var sum = 0;
              res.data.results.forEach(function(movie){
                if (movie.backdrop_path) {
                  sum += 1
                }
              })
              if(sum < 5) {
                getRecommendedMovies();
              } else{
              vm.recommendedMovies = res.data.results;
            }}}, function(err) {
              console.error('Error');
            })
      }


      // =================================
      //Tv Functions
      function getPopularTv() {
        $http.get('/tv?popular')
          .then(function(res) {
            var sum = 0;
            res.data.results.forEach(function(movie){
              if (movie.backdrop_path) {
                sum += 1
              }
            })
            if(sum < 5) {
              getPopularTv();
            } else {
            vm.popularTv = res.data.results;
          }}, function(err) {
            console.error('Error');
          })
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

      //filter function to filter null values in api calls
      vm.notEmptyOrNull = function(item){
        return !(item.backdrop_path === null || item.backdrop_path.trim().length === 0)
      }

  }
})();
