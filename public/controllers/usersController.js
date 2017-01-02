(function() {
  angular
    .module('webReels')
    .controller('UsersController', UsersController);

    UsersController.$inject = ['$state', 'authService', 'userDataService', '$log', 'authToken'];

    function UsersController($state, authService, userDataService, $log, authToken) {
      var vm = this;

      vm.currentUser = userDataService.user;

      vm.createUser = createUser

      function createUser() {
        $('#register').modal('hide');
        vm.message = '';
        userDataService.create(vm.userData)
          .then(function(data) {
            vm.userData = {};
            vm.message = data.data.message;
            authToken.setToken(data.data.token);
            userDataService.user = data.data.user;
            console.log('user created')
          }, function(err) {
            $log.error(err);
          });
      };
    };
})();
