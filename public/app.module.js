(function() {
  angular.module('webReels', ["ui.router", "ui.bootstrap", "ocNgRepeat"])

    .config(function($httpProvider) {

      // attach our auth interceptor to the http requests
      $httpProvider.interceptors.push('authInterceptor');
    })

    .run(['authService', function(authService){
      if (authService.isLoggedIn()) authService.setUser();
    }]);

})();
