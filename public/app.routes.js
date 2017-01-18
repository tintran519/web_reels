(function() {
  'use strict';

  angular
    .module('webReels')
    .config(AppRouter);

  AppRouter.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

  function AppRouter($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');


    $stateProvider
      .state('homePage', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'LoginController as vm'
      })
      .state('showPage', {
        url: '/:media/:id',
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

       $locationProvider.html5Mode({enabled: true,requireBase: false });
  }

})();
