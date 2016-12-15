(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('ShowController', ShowController);

    ShowController.$inject = ["movieService", "$http", "$sce"]

    function ShowController(movieService, $http, $sce) {
      var vm = this;

      vm.parseTrailer = parseTrailer;
      vm.topMovies = movieService.getTopMovies();
      vm.SelectedMovie = movieService.SelectedTopMovie;
      vm.MovieId = movieService.SelectedTopMovie.id

      vm.movieInfo = [];

      getMovieInfo();

      console.log(movieService.SelectedTopMovie)
      console.log('the ID', vm.MovieId)
      console.log('url here',`/movies?topRated[movieId]=${vm.MovieId}`)

      function getMovieInfo() {
        $http.get(`/movies?topRated[movieId]=${vm.MovieId}`)
          .then(function(res) {
            console.log(res);
            vm.movieInfo = res.data;
            vm.youTube = vm.parseTrailer(vm.movieInfo.videos.results[0].key);
          }, function(err) {
            console.error('error')
          })
      }

      function parseTrailer(link){
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + link);
      }
    }
})();
