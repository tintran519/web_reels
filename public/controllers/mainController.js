(function() {
  "use strict";

  angular
      .module("webReels")
      .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService"];

  function MainController($state, userDataService, $log, authService) {
    var vm = this;

    vm.userService = userDataService;
    vm.logout      = authService.logout;
    vm.isLoggedIn  = authService.isLoggedIn;

    vm.$state = $state;
  }

})();
