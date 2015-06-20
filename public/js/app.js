angular.module('app', ['app.controllers', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "/html/home.html"
      })
      .state('entrar', {
        url: "/entrar",
        templateUrl: "/html/entrar.html"
      })
      .state('cadastrar', {
        url: "/cadastrar",
        templateUrl: "/html/cadastrar.html"
      })
      .state('painel', {
        url: "/painel",
        templateUrl: "/html/painel.html"
      });
  });