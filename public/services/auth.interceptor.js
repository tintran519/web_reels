(function() {

  angular.module('webReels')
         .factory('authInterceptors', authInterceptor);

  authInterceptor.$inject = ["$q", "$location", "authToken"];

  //Auth Interceptor Factory
  function authInterceptor($q, $location, authToken) {
    var interceptorFactory = {};

    //this happens on all HTTP requests
    interceptorFactory.request = function(config) {

      //grab the token
      var token = authToken.getToken();

      //if the token exists, add it to the header as x-access-token
      if (token) config.headers['x-access-token'] = token;

      return config;
    };

    //happens on response errors
    interceptorFactory.responseError = function(response) {

      //if our server returns a 403 forbidden response
      if (response.status == 403) {
        authToken.setToken();
        $location.path('/');
      }

      //return the errors from the server as a promise
      return $q.reject(response);
    };

    return interceptorFactory;
  }

})();
