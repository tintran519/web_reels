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

      function getMovies() {
        $http.get()
      }

    }
})();
