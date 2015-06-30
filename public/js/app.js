angular.module('app', ['app.controllers', 'ui.router', 'LocalStorageModule'])
  .config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('notasfaceis')
      .setStorageType('sessionStorage')
      .setNotify(true, true);

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
        data: {
          requireLogin: false
        }
      })
      .state('cadastrar', {
        url: "/cadastrar",
        templateUrl: "/html/cadastrar.html",
        data: {
          requireLogin: false
        }
      });
  })
  .run(function($rootScope, $state, localStorageService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      var token = localStorageService.get('token');
      if(requireLogin && !token) {
        event.preventDefault();
        $state.go('entrar');
      }
    });
  });
