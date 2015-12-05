'use strict';

angular.module('chopShopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('produits', {
        url: '/produits',
        templateUrl: 'app/produits/templates/produits-liste.html',
        controller: 'ProduitsCtrl'
      })
      .state('nouveauProduit', {
        url: '/produits/nouveau',
        templateUrl: 'app/produits/templates/produits-nouveau.html',
        controller: 'NouveauProduitCtrl'
      })
      .state('voirProduit', {
        url: '/produits/:id',
        templateUrl: 'app/produits/templates/produits-voir.html',
        controller: 'VueProduitCtrl'
      })
      .state('editerProduit', {
        url: '/produits/:id/editer',
        templateUrl: 'app/produits/templates/produits-editer.html',
        controller: 'EditerProduitCtrl'
      });
  });
