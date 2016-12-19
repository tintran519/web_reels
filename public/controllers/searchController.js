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
        console.log('wazzah', vm.query)
        movieService.query = vm.query
        $http.get('/search?q=' + vm.query)
          .then(function(res) {
            vm.searchResults = res.data.results;
            console.log('search here', vm.searchResults);
            movieService.addMovies(res.data.results);
            // showSearch();
            $state.go('searchResultsPage',{},{reload:true})
            // $state.reload();
          }, function(err) {
            console.error('Error');
          })
      }

      function showSearch() {
        vm.searchResults = movieService.getMovies();
        vm.query = movieService.query;
      }

      function callToSelectedSearchedMovie(category, movie, type){
        movieService.SelectedMovie = movie;
        movieService.SelectedMovieType = type;
        movieService.SelectedCategory = category;
        console.log(category, movie, type);
      }

    }
})();
