(function() {

  angular.module('webReels')
         .factory('authToken', authToken);

  authToken.$inject = ["$window"];

  //||||||||||||||||||||||||||--
  // AUTH TOKEN FACTORY
  //||||||||||||||||||||||||||--
  function authToken($window) {
    var authTokenFactory = {};

    // get the token out of local storage
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    // function to set token or clear token
    // if a token is passed, set the token
    // if there is no token, clear it from local storage
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };

    return authTokenFactory;
  }
})();
