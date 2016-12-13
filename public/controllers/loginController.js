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

      //Featured Movie
      vm.featuredMovies = [];
      vm.movieImage;

      //Form data for login
      vm.loginData;

      function login() {
        $('#login').modal('hide');
        $http.get('/featured')
          .then(function(res) {
            console.log(res.data.backdrop_path);
            vm.featuredMovies = res.data;
            vm.movieImage = res.data.backdrop_path;
            return vm.movieImage;
          }, function(err) {
            console.error('Error retrieving movie');
          })
          .then(function(res) {
            console.log('movieImage link', res);
            $('.jumbotron.home').css('background-image', `url(https://image.tmdb.org/t/p/w1280${res})`);
            authService.login(vm.loginData.email, vm.loginData.password)
            return res;
          }, function(err) {
            console.error('Error');
          })
          .then(function(res) {
            $log.log(res);
            // $state.go('homePage');
          });
      };
    }

})();
