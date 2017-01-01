(function() {

  angular
    .module('webReels')
    .factory('movieService', movieService);

  function movieService() {
    var movieService = {};
    // movieService.Movies;
    movieService.SelectedMovie;
    movieService.SelectedMovieType;
    movieService.SelectedCategory;
    movieService.SelectedGenre;

    movieService.query;

    movieService.addMovies = function(List) {
      movieService.Movies = List;
    };

    movieService.getMovies = function(){
      return movieService.Movies;
    };

    return movieService;
  }
})()
