'use strict';

angular.module('chopShopApp')
  .controller('ProduitsCtrl', function ($scope,Produits) {
    $scope.message = 'Hello';
    $scope.produits = Produits.requete();
  })

  .controller('VueProduitCtrl', function ($scope, $state,
                                           $stateParams, Produits) {
    $scope.produit = Produits.recuperer({id: $stateParams.id});
    $scope.boutonSupprimerProduit = function(){
      Produits.supprimerProduit($scope.produit);
      $state.go('produits');
    }
      })
  .controller('NouveauProduitCtrl', function ($scope, $state, Produits) {
    $scope.produit = {}; // create a new instance
    $scope.boutonAjouterProduit = function(produit){
      Produits.creerUnProduit($scope.produit);
      $state.go('produits');
    }
  })
  .controller('EditerProduitCtrl', function ($scope, $state,
                                           $stateParams, Produits) {
    $scope.produit = Produits.recuperer({id: $stateParams.id});
    $scope.boutonEditerProduit = function(produit){
      Produits.mettreAjourProduit($scope.produit);
      $state.go('produits');
    }
  });
