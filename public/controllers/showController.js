(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('ShowController', ShowController);

    ShowController.$inject = ["movieService", "$http", "$sce", "$state"]

    function ShowController(movieService, $http, $sce, $state) {
      var vm = this;

      vm.parseTrailer = parseTrailer;
      vm.Movies = movieService.getMovies();
      vm.SelectedMovie = movieService.SelectedMovie;
      vm.MovieId = movieService.SelectedMovie.id;
      vm.MovieCategory = movieService.SelectedMovieType;
      vm.MediaCategory = movieService.SelectedCategory;
      // vm.GenreId = movieService.SelectedMovie.genre_ids[0] || movieService.SelectedMovie.genre[0].id;
      vm.GenreId = movieService.SelectedGenre;

      vm.movieInfo = [];

      vm.relatedInfo;
      vm.callToRelatedSelected = callToRelatedSelected;

      getMovieInfo();
      getRelatedInfo();

      console.log('selected movie', movieService.SelectedMovie)
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

      function getRelatedInfo() {
        console.log(vm.GenreId)
        $http.get(`/${vm.MediaCategory}?related[genreId]=${vm.GenreId}`)
          .then(function(res) {
            console.log('related info', res);
            vm.relatedInfo = res.data.results;
            console.log(vm.relatedInfo);
          }, function(err) {
            console.error('error')
          })
      }

      function callToRelatedSelected(category, movie, type, genre){
        movieService.SelectedMovie = movie;
        movieService.SelectedMovieType = type;
        movieService.SelectedCategory = category;
        movieService.SelectedGenre = genre;
        $state.go('showPage',{},{reload:true})
      }

      function parseTrailer(link){
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + link);
      }
    }
})();
