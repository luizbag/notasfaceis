angular.module('app.services', ['ngResource'])
  .factory('AuthToken', ['$window', function($window) {
    var storage = $window.localStorage;
    var cachedToken;
    return {
      setToken: function(token) {
        cachedToken = token;
        storage.setItem('token', token);
      },
      getToken: function() {
        if(!cachedToken)
          cachedToken = storage.getItem('token');
        return cachedToken;
      },
      removeToken: function() {
        cachedToken = null;
        storage.removeItem('token');
      },
      isAuthenticated: function() {
        return !!this.getToken();
      }
    };
  }])
  .factory('AuthInterceptor', function(AuthToken) {
    return {
      request: function(config) {
        var token = AuthToken.getToken();
        if(token)
          config.headers.Authorization = token;
        return config;
      },
      response: function(response) {
        return response;
      }
    }
  })
  .factory('Caderno', ['$resource', function($resource) {
    return $resource('/cadernos/:id');
  }])
  .factory('Nota', ['$resource', function($resource) {
    return $resource('/cadernos/:cadernoId/notas/:id', {cadernoId: '@cadernoId', id: '@id'}, { 'update': { method:'PUT' } });
  }])
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
