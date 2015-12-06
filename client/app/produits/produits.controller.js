'use strict';
var errorHandler;
angular.module('chopShopApp')
  .controller('ProduitsCtrl', function ($scope,Produits) {
    $scope.message = 'Hello';
    $scope.produits = Produits.query();
  })

  .controller('VueProduitCtrl', function ($scope, $state,
                                           $stateParams, Produits) {
    $scope.produit = Produits.get({id: $stateParams.id});
    $scope.boutonSupprimerProduit = function(){

      //*************************************************************************************************************
      //Une explication s'impose !!!!!!!!!!
      // On appelle la factory "Produits" ou le service "Produits", whatever...
      // Ce service retourne l'objet $resources qui contient les actions : get, save, query, delete,remove
      // Ci dessous on a besoin de l'action "delete"
      // Le module angular-resources utilise l'objet $http DONC on a un appel sur le serveru
      // Le serveur reçoit un $http de type delete
      // Pour le serveur un $http de type delete actionne l'action suivante du controlleur produit  : destructionSansReflechirDeUnProduit
      //*************************************************************************************************************
      Produits.delete({id: $scope.produit._id},

        function success(/* value, responseHeaders */) {
          $state.go('produits');
        }, errorHandler($scope));
    };
  })
  .controller('NouveauProduitCtrl', function ($scope, $state, Produits) {
    $scope.produit = {}; // create a new instance
    $scope.boutonAjouterProduit = function(){
      Produits.save($scope.produit,
        function success(value /*, responseHeaders*/){
          $state.go('voirProduit', {id: value._id});
        }, errorHandler($scope));
    };
  })
  .controller('EditerProduitCtrl', function ($scope, $state,
                                             $stateParams, Produits) {
  $scope.produit = Produits.get({id: $stateParams.id});
  $scope.boutonEditerProduit = function(){
    Produits.mettreAjourLeProduitAvecUnUpdate({id: $scope.produit._id},
      $scope.produit, function success(value /*, responseHeaders*/){
        $state.go('voirProduit', {id: value._id});
      }, errorHandler($scope));
  };
});

errorHandler = function ($scope){
  return function error(httpResponse){
    $scope.errors = httpResponse;
  };
};
