angular.module('app.controllers', [])
  .controller('LoginController', ['$scope','$state', function($scope, $state) {
    $scope.login = function(email, senha) {
      $state.go('painel');
    }
  }]);