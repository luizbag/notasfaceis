angular.module('app.controllers', ['app.services', 'LocalStorageModule'])
  .controller('LoginController', ['LoginService', 'AuthToken', '$rootScope', '$scope', '$state', function(LoginService, AuthToken, $rootScope, $scope, $state) {
    $scope.login = function(email, password) {
      LoginService.login(email, password, function(token) {
        if(token !== 'Unauthorized') {
          AuthToken.setToken(token);
          $state.go("painel");
        } else {
          $scope.error = "Usuario não encontrado";
        }
      });
    };

    $scope.register = function(email, password) {
      LoginService.register(email, password, function(user) {
        $state.go("entrar");
      });
    };

    $scope.logout = function() {
      AuthToken.removeToken();
      $state.go("home");
    };
  }])
  .controller('PainelController', ['Caderno', '$scope', function(Caderno, $scope){
    $scope.cadernos = Caderno.query();
  }])
  .controller('CadernoController', ['Caderno', '$scope', '$state', function(Caderno, $scope, $state) {
    $scope.novoCaderno = function() {
      $state.transitionTo('painel.novoCaderno');
    };

    $scope.salvar = function(nome) {
      var caderno = {};
      caderno.nome = nome;
      Caderno.save(caderno, function() {
        $scope.cadernos.push(caderno);
        $state.transitionTo('painel');
      });
    };

    $scope.cancelar = function() {
      $state.transitionTo('painel');
    };
  }]);
