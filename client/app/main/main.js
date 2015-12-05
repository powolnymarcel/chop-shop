'use strict';

angular.module('chopShopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/principal.html',
        controller: 'PrincipalCtrl'
      });
  });
