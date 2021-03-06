'use strict';
var errorHandler,uploadHandler,uploadHandler2;

angular.module('chopShopApp')
  .controller('ProduitsCtrl', function ($scope,Produits) {

    //On a besoin de tous les produits, on va faire appel au service "Produits" pour cela, on peut remarquer que le service a été injecté dans le controlleur
    // L'action query dans ressource utilise l'objet $http et fait un GET sur le serveur
    //Un GET sans :id sur le serveur active l'action "balanceMoiLaListeDeTousLesProduits" du controlleur serveur produits.controller.js

    // 'Produits' pour le nom du factory et 'query()' pour le nom de l'action contenue dans les resources

    $scope.produits = Produits.query();
    //Ici on écoute le broadcast
    $scope.$on('search:term', function (event, data) {
      if(data.length) {
        $scope.produits = Produits.search({id: data});
        $scope.query = data;
      }
      else {
        $scope.produits = Produits.query();
        $scope.query = '';
      }
    });
  })
  .controller('ProductCatalogCtrl', function ($scope, $stateParams,Produits)
  {
    $scope.produits = Produits.catalog({id: $stateParams.slug});
    $scope.query = $stateParams.slug;
  })

  .controller('VueProduitCtrl', function ($scope, $state,
                                           $stateParams, Produits) {
    $scope.produit = Produits.get({id: $stateParams.id});
    $scope.boutonSupprimerProduit = function(){

      //*************************************************************************************************************
      //Une explication s'impose !!!!!!!!!! L'explication ci dessous s'applique aux controlleurs listés dans ce fichier, évidemment seul le nom des actions change
      //Quand le client clique sur le bouton rouge "supprimer"
      // On appelle le/la factory "Produits" ou le service "Produits", whatever...
      // Ce service retourne l'objet $resources qui contient les actions : get, save, query, delete,remove
      // Dans ce cas ci, on a besoin de l'action "delete"
      // Le module angular-resources utilise l'objet $http DONC angular-resources lance un appel sur le serveur
      // Le serveur reçoit un $http de type delete avec un id
      // Pour le serveur un $http de type delete avec id actionne l'action suivante du controlleur produit  : destructionSansReflechirDeUnProduit
      //*************************************************************************************************************
      Produits.delete({id: $scope.produit._id},

        function success(/* value, responseHeaders */) {
          //Si tout s'est bien passé, on demande l'affichage de l'état 'produits'
          //Les états se trouvent coté clients dans le fichier produits.js
          $state.go('produits');
        }, errorHandler($scope));
    };
  })
  .controller('NouveauProduitCtrl', function ($scope, $state, Produits,Upload,$timeout,Catalog) {
    $scope.categories = Catalog.query();
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log($scope.categories);
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

    console.log('*****************************');
    $scope.upload = uploadHandler2($scope, Upload, $timeout);
    console.log($scope.upload);
    console.log('*****************************');
    console.log($scope.file);

    $scope.produit = {}; // create a new instance
    $scope.boutonAjouterProduit = function(){
      if($scope.file){
        console.log($scope.produit);
        console.log('*****************************');
        console.log('*****************************');
        console.log('*****************************');

        $scope.produit.imageUrl=$scope.file.result.imageUrl;
      }
      Produits.save($scope.produit,
        function success(value /*, responseHeaders*/){
          Produits.mettreAjourLeProduitAvecUnUpdate({id: value._id},
            $scope.produit, function success(value /*, responseHeaders*/){
              $state.go('voirProduit', {id: value._id});
            }, errorHandler($scope));


          $state.go('voirProduit', {id: value._id});
        }, errorHandler($scope));
    };
  })
  .controller('EditerProduitCtrl', function ($scope, $state,
                                             $stateParams, Produits,Upload,$timeout) {
  $scope.produit = Produits.get({id: $stateParams.id});

    //Ici le get contient un id, donc
    //Le service vans dans $resources
    //Dans resources un get fait un $http sur le serveur
    //Le serveur reçoit l'appel et remarque qu'un id est présent
    //Le serveur active la route /:id
    //Cette route dit : Active "montreMoiUnProduitUnique" dans le controlleur produit.controller.js, toujours coté serveur
    // La reponse est reçue dans le callback success
    //On affiche la vue voirProduit de l'id concerné
  $scope.boutonEditerProduit = function(){
    console.log('**************Activation action EDIT******************');
    //Assignation du path de la nouvelle image au scope du produit
    if($scope.file){
      $scope.produit.imageUrl=$scope.file.result.imageUrl;
    }
    Produits.mettreAjourLeProduitAvecUnUpdate({id: $scope.produit._id},
      $scope.produit, function success(value /*, responseHeaders*/){
        $state.go('voirProduit', {id: value._id});
      }, errorHandler($scope));
  };
    $scope.upload = uploadHandler($scope, Upload, $timeout);
})

  .constant('clientTokenPath', '/api/braintree/client_token')

  .controller('ProductCheckoutCtrl',
    function($scope, $http, $state, ngCart){
      $scope.errors = '';

      $scope.paymentOptions = {
        onPaymentMethodReceived: function(payload) {
          angular.merge(payload, ngCart.toObject());
          payload.total = payload.totalCost;
          $http.post('/api/commande', payload)
            .then(function success () {
              ngCart.empty(true);
              $state.go('products');
            }, function error (res) {
              $scope.errors = res;
            });
        }
      };
    });

errorHandler = function ($scope){
  return function error(httpResponse){
    $scope.errors = httpResponse;
  };
};

uploadHandler = function ($scope, Upload, $timeout) {
  return function(file) {
    if (file && !file.$error) {
      $scope.file = file;
      file.upload = Upload.upload({
        url: '/api/produits/'+$scope.produit._id+'/upload',
        file: file
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0){
          console.log(response.status + ': ' + response.data);
          errorHandler($scope)(response.status + ': ' + response.data);
        }
      });

      file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };
};


//Trouver une solution pour l'upload de l'img à l'ajout d'un produit
uploadHandler2 = function ($scope, Upload, $timeout) {
  return function(file) {
    if (file && !file.$error) {
      $scope.file = file;
      file.upload = Upload.upload({
        url: '/api/produits/test/upload/image',
        file: file
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0){
          console.log(response.status + ': ' + response.data);
          errorHandler($scope)(response.status + ': ' + response.data);
        }
      });

      file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };
};
