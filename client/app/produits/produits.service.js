'use strict';


angular.module('chopShopApp')
  .factory('Produits', function ($stateParams) {
    var last_id = 5;
    var exemple_produits = [
      {_id: 1, title: 'Product 1', price: 123.45, quantity: 10,
        description: 'Lorem ipsum dolor sit amet'},
      {_id: 2, title: 'Product 2', price: 123.45, quantity: 10,
        description: 'Lorem ipsum dolor sit amet'},
      {_id: 3, title: 'Product 3', price: 123.45, quantity: 10,
        description: 'Lorem ipsum dolor sit amet'},
      {_id: 4, title: 'Product 4', price: 123.45, quantity: 10,
        description: 'Lorem ipsum dolor sit amet'},
      {_id: 5, title: 'Product 5', price: 123.45, quantity: 10,
        description: 'Lorem ipsum dolor sit amet'}
    ];
    return {
      requete: function(){
        return exemple_produits;
      },
      recuperer: function(produit){
        var result = {};
        angular.forEach(exemple_produits, function (produit) {
          if(produit._id == $stateParams.id)
            return this.produit = produit;
        }, result);
        return result.produit;
      },
      supprimerProduit: function(params){
        angular.forEach(exemple_produits, function (produit, index) {
          if(produit._id == $stateParams._id){
            console.log(produit, index);
            exemple_produits.splice(index, 1);
            return;
          }
        });
      },
      creerUnProduit: function(produit){
        produit.id = ++last_id;
        exemple_produits.push(produit);
      },
      mettreAjourProduit: function(produit){
        var item = this.recuperer(produit);
        if(!item) return false;
        item.title = produit.title;
        item.price = produit.price;
        item.quantity = produit.quantity;
        item.description = produit.description;
        return true
      }
    };
  });
