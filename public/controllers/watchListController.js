(function(){
  'use strict';

  angular
    .module('webReels')
    .controller('WatchListController', WatchListController);

  WatchListController.$inject = ["$state", "$http", "movieService"];

  function WatchListController($state, $http, movieService) {
    var vm = this;

    function getList(){
    }
  }
})
