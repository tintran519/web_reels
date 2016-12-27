(function() {
  'use strict';

  angular
    .module('webReels')
    .config(AppRouter);

  AppRouter.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('homePage', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'LoginController as vm'
      })
      .state('showPage', {
        url: '/movie/:id',
        templateUrl: 'templates/show.html',
        controller: 'ShowController as show'
      })
      .state('searchResultsPage', {
        url: '/search',
        templateUrl: 'templates/searchResults.html',
        controller: 'SearchResultsController as search'
      })
      .state('watchListPage', {
        url: '/watchList',
        templateUrl: 'templates/watchList.html',
        controller: 'WatchListController as watch'
      })
  }

})();
