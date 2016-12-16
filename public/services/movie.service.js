(function() {

  angular
    .module('webReels')
    .factory('movieService', movieService);

  function movieService() {
    var movieService = {};
    movieService.Movies = [];
    movieService.SelectedMovie;
    movieService.SelectedMovieType;

    movieService.addMovies = function(List) {
      movieService.Movies.push(List);
    };

    movieService.getMovies = function(){
      return movieService.Movies;
    };

    return movieService;
  }
})()
