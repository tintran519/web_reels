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
      vm.test = 'blahh'

      //Invoke functions to display movies on home page
      getFeaturedMovies();
      getTopMovies();
      getPopularMovies();
      getRecommendedMovies();
      getPopularTv()

      setTimeout (function() {
        owl();
      },3000)

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
              console.log('topMovies', vm.topMovies)
            }, function(err) {
              console.error('Error');
            })
      }

      function getPopularMovies() {
          $http.get('/movie?popular')
            .then(function(res) {
              vm.popularMovies = res.data.results;
              console.log('pop Movies', vm.popularMovies)
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

        vm.carouselInitializer = function() {
          $(".about-carousel").owlCarousel({
            items: 3,
            navigation: true,
            pagination: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
          });
        };

      function owl() {
        $(".owl-carousel").owlCarousel({
          loop:true,
          margin:10,
          nav:true,
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

      vm.notEmptyOrNull = function(item){
        return !(item.name_fr === null || item.name_fr.trim().length === 0)
      }

  }
})();
