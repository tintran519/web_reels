(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ["$log", "movieService", "$http", "$state"]

    function SearchResultsController ($log, movieService, $http, $state) {
      var vm = this;

      vm.callToSelectedSearchedMovie = callToSelectedSearchedMovie;
      vm.getSearch = getSearch;
      vm.query;
      vm.searchResults = [];

      showSearch();

      function getSearch() {
        movieService.query = vm.query
        $http.get('/search?q=' + vm.query)
          .then(function(res) {
            vm.searchResults = res.data.results;
            movieService.addMovies(res.data.results);
            vm.query = "";
            $state.go('searchResultsPage',{},{reload:true})
          }, function(err) {
            console.error('Error');
          })
      }

      function showSearch() {
        vm.searchResults = movieService.getMovies();
        vm.query = movieService.query;
      }

      function callToSelectedSearchedMovie(category, movie, type, genre){
        movieService.SelectedMovie = movie;
        movieService.SelectedMovieType = type;
        movieService.SelectedCategory = category;
        movieService.SelectedGenre = genre;
      }

    }
})();
