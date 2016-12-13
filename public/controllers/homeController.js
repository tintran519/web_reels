(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('HomeController', HomeController);

    HomeController.$inject = ["$state", "userDataService", "$log", "$http","$window"]

    function HomeController($state, userDataService, $log, $http, $window){
      var vm = this;

      vm.featuredMovies = [];

      vm.getMovies = getMovies;

      vm.getMovies();

      function getMovies() {
        console.log('working');
        $http.get('/featured')
          .then(function(res) {
            console.log(res);
            if (res.data.status_code === 34) {
              console.log('if statement working');
              $('.jumbotron.home').css('background-image', `url(https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg)`);
              return;
            }
            else {
            console.log(res.data.backdrop_path);
            vm.featuredMovies = res.data;
            vm.movieImage = res.data.backdrop_path;
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



  }
})();
