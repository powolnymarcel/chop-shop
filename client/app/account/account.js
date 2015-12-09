'use strict';

angular.module('chopShopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('connexion', {
        url: '/connexion',
        templateUrl: 'app/account/connexion/connexion.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'main';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('inscription', {
        url: '/inscription',
        templateUrl: 'app/account/inscription/inscription.html',
        controller: 'InscriptionCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
