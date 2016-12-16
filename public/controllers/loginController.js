(function() {
  'use strict';

  angular
    .module('webReels')
    .controller('LoginController', LoginController);

    LoginController.$inject = ["$state", "userDataService", "$log", "authService", "$http"];

    function LoginController($state, userDataService, $log, authService, $http) {
      var vm = this;

      vm.login       = login;
      vm.isLoggedIn  = authService.isLoggedIn;
      vm.currentUser = userDataService.user;

      //Form data for login
      vm.loginData;

      function login() {
        $('#login').modal('hide');
        $('body').css('background-image','url()');
        $('body').css('background-color','black');
          authService.login(vm.loginData.email, vm.loginData.password)
          .then(function(res) {
            $log.log(res);
          });
      };
    }

})();
