(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('HomeController', HomeController);

    HomeController.$inject = ["$state", "userDataService", "$log", "$http"]

    function HomeController($state, userDataService, $log, $http){
      var vm = this;

      vm.featuredMovies = [];

      vm.getMovies = getMovies;

      vm.getMovies();

      function getMovies() {
        $http.get('/featured')
          .then(function(res) {
            console.log(res);
            vm.featuredMovies = res.data;
          }, function(err) {
            console.error('Error retrieving movie');
          });
    }
  }
})();
