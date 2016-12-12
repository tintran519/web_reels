(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('HomeController', HomeController);

    HomeController.$inject = ["$http"]

    function HomeController($http){
      var vm = this;

      vm.movies = [];

      vm.getMovies = getMovies;

      vm.getMovies();

      function getMovies() {
        $http.get('https://api.themoviedb.org/3/movie/120?api_key=' + process.env.TMDB_API_KEY)
          .then(function(res){
            console.log(res.data);
            vm.movies= res.data;
          }, function(err) {
            console.error('Error retrieving movie', err);
          });
      }

    }
})();
