(function() {

  angular.module('webReels')
         .factory('authService', authService);

  authService.$inject = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];

  //||||||||||||||||||||||||||--
  // AUTH SERVICE FACTORY
  //||||||||||||||||||||||||||--
  function authService($http, $q, authToken, userDataService, $state, $window) {

    // create auth factory object
    var authFactory = {};

    // log a user in
    authFactory.login = function(email, password) {

      // return the promise object and its data
      return $http.post('/login', {
        email:       email,//continue here
        password:    password
      })
        .success(function(data) {
          authToken.setToken(data.token);

          // set userDataService.user to the logged in user
          userDataService.user = data.user;
          console.log("check it out", userDataService);
          return data;
        });
    };

    // log a user out by clearing the token
    authFactory.logout = function() {
      // clear the token
      authToken.setToken();

      // return to homepage
      $('body').css('background-image','url(https://s-media-cache-ak0.pinimg.com/originals/0c/1b/54/0c1b541757e16d7c32736c0ec00d416f.jpg)');
      $state.go('homePage');
    };

    // check if a user is logged in
    // checks if there is a local token
    authFactory.isLoggedIn = function() {
      if (authToken.getToken())
        return true;
      else
        return false;
    };

    // get the logged in user
    authFactory.setUser = function() {
      var token = authToken.getToken().split('.')[1];
      var user = JSON.parse($window.atob(token));
      userDataService.user = user;
      return user;
    };

    // return auth factory object
    return authFactory;
  }

})();
