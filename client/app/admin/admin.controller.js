'use strict';

angular.module('chopShopApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User, Produits, $state) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.deleteUser = function(user) {
      User.remove({ id: user._id });
      $scope.users.splice(this.$index, 1);
    };

    $scope.produits = Produits.query();

    $scope.showProduct = function(produit){
      $state.go('voirProduit', {id: produit._id});
    };

    $scope.editProduct = function(produit){
      $state.go('editerProduit', {id: produit._id});
    };

    $scope.deleteProduct = function(produit){
      Produits.remove({ id: produit._id });
      $scope.produits.splice(this.$index, 1);
    };
  });
