(function() {

  angular
    .module('webReels')
    .factory('movieService', movieService);

  function movieService() {
    var movieService = {};
    movieService.topMovies = [];
    movieService.SelectedTopMovie;

    movieService.addTopMovies = function(topList) {
      movieService.topMovies.push(topList);
    };

    movieService.getTopMovies = function(){
      return movieService.topMovies;
    };

    return movieService;
  }
})()
