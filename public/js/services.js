angular.module('app.services', ['ngResource'])
  .service('LoginService', ['$http', function($http) {
    this.login = function(email, password, callback) {
      $http.post('/login', {"email": email, "password": password}).
        success(function(data, status, headers, config) {
          callback(data);
        }).
        error(function(data, status, headers, config) {
          var token = "Unauthorized";
          callback(token);
        });
    };

    this.register = function(email, password, callback) {
      $http.post('/login/register', {"email": email, "password": password}).
        success(function(data, status, headers, config) {
          callback(data);
        }).
        error(function(data, status, headers, config) {
          console.log(status);
        });
    };
  }]);
