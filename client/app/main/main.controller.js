'use strict';

angular.module('chopShopApp')
  .controller('PrincipalCtrl', function($scope, $http, socket, Produits) {
    // Produits pour le nom du factory et query pour le nom de l'action contenue dans les resources
    $scope.produits = Produits.query();
  });
