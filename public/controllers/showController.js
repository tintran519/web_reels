(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('ShowController', ShowController);

    ShowController.$inject = ["movieService", "$http", "$sce", "$state","userDataService"]

    function ShowController(movieService, $http, $sce, $state, userDataService) {
      var vm = this;

      //Function to parse youtube link
      vm.parseTrailer = parseTrailer;

      //Display all movies from service
      // vm.Movies = movieService.getMovies();

      //Selected movie info
      vm.SelectedMovie = movieService.SelectedMovie;
      vm.MovieId = movieService.SelectedMovie.id;
      vm.MovieCategory = movieService.SelectedMovieType;
      vm.MediaCategory = movieService.SelectedCategory;
      vm.GenreId = movieService.SelectedGenre;

      //Array that stores movie
      vm.movieInfo = [];

      //Related Reels
      vm.relatedInfo;
      vm.callToRelatedSelected = callToRelatedSelected;

      //Functions to run when page loads to display movies
      getMovieInfo();
      getRelatedInfo();

      //Add movie to watchlist
      vm.addToWatchList = addToWatchList;

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

      function addToWatchList(){
        var id = userDataService.user._id;
        $http.post('/users/' + id + '/watchlist', {
          id: vm.MovieId,
          media: vm.MediaCategory
        })
      }

      function parseTrailer(link){
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + link);
      }
    }
})();
