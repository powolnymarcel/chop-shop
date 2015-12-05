'use strict';

angular.module('chopShopApp')
  .controller('PrincipalCtrl', function($scope, $http, socket, Produits) {
    $scope.produits = Produits.requete().slice(2);
  });
