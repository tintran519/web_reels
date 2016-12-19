(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('SearchResultsController', SearchResultsController);

    SearchResultsController.$inject = ["$log", "movieService", "$http", "$state"]

    function SearchResultsController ($log, movieService, $http, $state) {
      var vm = this;

      vm.getSearch = getSearch;
      vm.query;
      vm.searchResults = [];

      showSearch();

      // getSearchResults();
      // function getSearchResults () {
      //     vm.searchResults = movieService.getMovies();
      //     console.log('blah',vm.searchResults)
      //   }

      function getSearch() {
        console.log('wazzah', vm.query)
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
      }


    }
})();
