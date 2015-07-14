angular.module('app.controllers', ['app.services'])
  .controller('LoginController', ['LoginService', 'AuthToken', '$scope', '$state', function(LoginService, AuthToken, $scope, $state) {
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
  .controller('PainelController', ['Caderno', '$rootScope', function(Caderno, $rootScope){
    $rootScope.cadernos = Caderno.query();
  }])
  .controller('CadernoController', ['Caderno', 'Nota', '$rootScope', '$scope', '$state', function(Caderno, Nota, $rootScope, $scope, $state) {
    $scope.novoCaderno = function() {
      $state.transitionTo('painel.novoCaderno');
    };

    $scope.salvar = function(nome) {
      var cad = {};
      cad.nome = nome;
      Caderno.save(cad, function(caderno) {
        $rootScope.cadernos.push(caderno);
        $state.transitionTo('painel');
      });
    };

    $scope.cancelar = function() {
      $state.transitionTo('painel');
    };

    $scope.selectCaderno = function(caderno) {
      $rootScope.caderno = caderno;
      $state.transitionTo('painel.caderno');
    };

    $scope.novaNota = function() {
      $rootScope.nota = {};
      $rootScope.formName = "Nova Nota";
      $state.transitionTo('painel.caderno.nota');
    }

    $scope.selectNota = function(nota) {
      $rootScope.nota = nota;
      $rootScope.formName = "Editar Nota";
      $state.transitionTo('painel.caderno.nota');
    };

    $scope.salvarNota = function(nota) {
      var cadernoId = $rootScope.caderno._id;
      var notaId = $rootScope.nota._id;
      if(notaId) {
        Nota.update({cadernoId: cadernoId, id: notaId}, nota, function(n) {
          $state.transitionTo('painel.caderno');
        });
      } else {
        Nota.save({cadernoId: cadernoId}, nota, function(n) {
          $rootScope.caderno.notas.push(nota);
          $state.transitionTo('painel.caderno');
        });
      }
    };
  }]);
