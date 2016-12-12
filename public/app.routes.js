(function() {
  'use strict';

  angular
    .module('webReels')
    .config(AppRouter);

  AppRouter.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('homePage', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'LoginController as vm'
      })
      .state('showPage', {
        url: '/show',
        templateUrl: 'templates/show.html',
        controller: 'ShowController as vm'
      })
  }

})();
