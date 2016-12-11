(function() {
  'use strict';

  angular
    .module('webReels', ['ui.router'])
    .config(AppRouter);

  function AppRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('homePage', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeController as vm'
      })
      .state('showPage', {
        url: '/show',
        templateUrl: 'templates/show.html',
        controller: 'ShowController as vm'
      })
  }
})();
