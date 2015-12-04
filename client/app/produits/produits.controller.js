'use strict';

angular.module('chopShopApp')
  .controller('ProduitsCtrl', function ($scope,Produits) {
    $scope.message = 'Hello';
    $scope.produits = Produits;
  });
