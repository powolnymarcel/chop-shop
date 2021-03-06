'use strict';

angular.module('chopShopApp')
  .controller('PrincipalCtrl', function($scope, $http, socket, Produits) {

    //Concerne la page d'accueil
    //On a besoin de tous les produits, on va faire appel au service "Produits" pour cela, on peut remarquer que le service a été injecté dans le controlleur
    // L'action query dans ressource utilise l'objet $http et fait un GET sur le serveur
    //Un GET sans :id sur le serveur active l'action "balanceMoiLaListeDeTousLesProduits" du controlleur serveur produits.controller.js

    // 'Produits' pour le nom du factory et 'query()' pour le nom de l'action contenue dans les resources
    $scope.produits = Produits.query();
  });
