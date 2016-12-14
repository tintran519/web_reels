(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('ShowController', ShowController);

    ShowController.$inject = ["movieService"]

    function ShowController(movieService) {
      var vm = this;
      vm.topMovies = movieService.getTopMovies();
      vm.SelectedMovie = movieService.SelectedTopMovie;

      console.log(movieService.SelectedTopMovie)
    }
})();
