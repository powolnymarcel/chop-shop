'use strict';

angular.module('chopShopApp')
  .controller('PrincipalCtrl', function($scope, $http, socket, Produits) {
    //On a besoin de tous les produits, on va faire appel au service "Produits" pour cela, on peut remarquer qu'il a été injecté dans le controlleur
    // 'Produits' pour le nom du factory et 'query()' pour le nom de l'action contenue dans les resources
    // L'action query dans ressource utilise l'objet $http et fait un GET sur le serveur
    //Un GET sans :id sur le serveur active l'action "balanceMoiLaListeDeTousLesProduits" du controlleur serveur produits.controller.js
    $scope.produits = Produits.query();
  });
