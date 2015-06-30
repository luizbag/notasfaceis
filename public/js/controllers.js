angular.module('app.controllers', [])
  .controller('LoginController', function($scope) {
    $scope.login = function(email, senha) {
      console.log(email, senha);
    }
  });