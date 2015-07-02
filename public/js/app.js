angular.module('app', ['app.controllers', 'app.services', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "/html/home.html",
        data: {
          requireLogin: false
        }
      })
      .state('entrar', {
        url: "/entrar",
        templateUrl: "/html/entrar.html",
        controller: 'LoginController',
        data: {
          requireLogin: false
        }
      })
      .state('cadastrar', {
        url: "/cadastrar",
        templateUrl: "/html/cadastrar.html",
        controller: 'LoginController',
        data: {
          requireLogin: false
        }
      })
      .state('painel', {
        url: "/painel",
        templateUrl: "/html/painel.html",
        controller: 'PainelController',
        data: {
          requireLogin: true
        }
      })
      .state('painel.novoCaderno', {
        url: "/novoCaderno",
        templateUrl: "/html/novo_caderno.html",
        controller: 'CadernoController'
      })
      .state('painel.caderno', {
        url: "/caderno",
        templateUrl: "/html/caderno.html",
        controller: 'CadernoController'
      });
      $httpProvider.interceptors.push('AuthInterceptor');
  })
  .run(function($rootScope, $state, AuthToken) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      if(requireLogin && !AuthToken.isAuthenticated()) {
        event.preventDefault();
        $state.go('entrar');
      }
    });
  });
