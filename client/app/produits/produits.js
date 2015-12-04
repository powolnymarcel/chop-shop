'use strict';

angular.module('chopShopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('produits', {
        url: '/produits',
        templateUrl: 'app/produits/produits.html',
        controller: 'ProduitsCtrl'
      });
  });
