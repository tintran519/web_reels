(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('ShowController', ShowController);

    ShowController.$inject = ["movieService", "$http", "$sce"]

    function ShowController(movieService, $http, $sce) {
      var vm = this;

      vm.parseTrailer = parseTrailer;
      vm.Movies = movieService.getMovies();
      vm.SelectedMovie = movieService.SelectedMovie;
      vm.MovieId = movieService.SelectedMovie.id;
      vm.MovieCategory = movieService.SelectedMovieType;
      vm.MediaCategory = movieService.SelectedCategory;

      vm.movieInfo = [];

      getMovieInfo();

      console.log(movieService.SelectedMovie)
      // console.log('here is the type', movieService.SelectedMovieType)
      // console.log('the ID', vm.MovieId)

      function getMovieInfo() {
        console.log(`/${vm.MediaCategory}?${vm.MovieCategory}[movieId]=${vm.MovieId}`)
        $http.get(`/${vm.MediaCategory}?${vm.MovieCategory}[movieId]=${vm.MovieId}`)
          .then(function(res) {
            console.log('here is the movie info',res);
            vm.movieInfo = res.data;
          }, function(err) {
            console.error('error')
          })
      }

      function parseTrailer(link){
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + link);
      }
    }
})();
