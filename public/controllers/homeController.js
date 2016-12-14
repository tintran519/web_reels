(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('HomeController', HomeController);

    HomeController.$inject = ["$state", "userDataService", "$log", "$http","$window","movieService"]

    function HomeController($state, userDataService, $log, $http, $window, movieService) {
      var vm = this;

      //Movie Lists
      vm.featuredMovies = {};
      vm.topMovies = [];
      vm.popularMovies = [];
      vm.recommendedMovies = [];
      vm.callToSelectedTopMovie = callToSelectedTopMovie;

      //Invoke functions
      getFeaturedMovies();
      getTopMovies().then(function(res) {
        callToAddTopMovies(vm.topMovies);
      }, function(err) {
        $log.error(err)
      });
      getPopularMovies();
      getRecommendedMovies();

      function callToSelectedTopMovie(movie){
        movieService.SelectedTopMovie = movie;
      }

      function callToAddTopMovies (topList) {
        movieService.addTopMovies(topList);
      };

      function getFeaturedMovies() {
        $http.get('/featured')
          .then(function(res) {
            if (res.data.status_code === 34) {
              $('.jumbotron.home').css('background-image', `url(https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg)`);
              $('#featuredTitle').text('Interstellar');
              $('#featuredOverview').text("Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.");
              return;
            } else {
              vm.featuredMovies.title = res.data.title;
              vm.featuredMovies.overview = res.data.overview;
              vm.movieImage = res.data.backdrop_path;
              console.log("wush", res.data);
              return vm.movieImage;
            }
            }, function(err) {
            console.error('Error retrieving movie');
          })
          .then(function(res) {
            if (res === undefined) return;
            console.log('movieImage link', res);
            $('.jumbotron.home').css('background-image', `url(https://image.tmdb.org/t/p/original${res})`);
          }, function(err) {
            console.error('Error');
          })
      }

      function getTopMovies() {
          return $http.get('/topRated')
            .then(function(res) {
              console.log('top movies', res);
              vm.topMovies = res.data.results;
              console.log('look here', vm.topMovies)
            }, function(err) {
              console.error('Error');
            })
      }

      function getPopularMovies() {
          $http.get('/popular')
            .then(function(res) {
              console.log('top movies', res);
              vm.popularMovies = res.data.results;
              console.log('look here', vm.popularMovies)
            }, function(err) {
              console.error('Error');
            })
      }

      function getRecommendedMovies() {
        console.log('recmovies working');
          $http.get('/recommended')
            .then(function(res) {
              console.log('recommeded object', res);
              vm.recommendedMovies = res.data.results;
              console.log('look here for rec', vm.recommendedMovies)
            }, function(err) {
              console.error('Error');
            })
      }
  }
})();
