angular.module('app.controllers', ['app.services', 'LocalStorageModule'])
  .controller('LoginController', ['LoginService', 'localStorageService', '$rootScope', '$scope', '$state', function(LoginService, localStorageService, $rootScope, $scope, $state) {
      $scope.login = function(email, password) {
        LoginService.login(email, password, function(token) {
          if(token !== 'Unauthorized') {
            localStorageService.set('token', token);
            console.log("sucesso");
            //$state.go("painel.campanhas");
          } else {
            $scope.error = "Usuario não encontrado";
          }
        });
      }

      $scope.register = function(email, password) {
        LoginService.register(email, password, function(user) {
          $state.go("entrar");
        })
      }

      $scope.logout = function() {
        localStorageService.remove('user');
        $state.go("home");
      }
    }]);
