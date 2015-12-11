'use strict';

angular.module('chopShopApp')
  .controller('NavbarCtrl', function ($scope, Auth, $rootScope,
                                      $state, $window, $timeout) {
    $scope.menu = [{
      'title': 'Accueil',
      'state': 'main'
    }, {
      'title': 'Produits',
      'state': 'produits'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.rechercher = function () {
      $rootScope.$broadcast('search:term', $scope.motRecherche);
    };
    $scope.redirect = function () {
      $state.go('produits');
// timeout makes sure that it is invoked after any other event has been triggered.
      $timeout(function () {
// focus on search box
        var searchBox = $window.document.getElementById('searchBox');
        if(searchBox){ searchBox.focus(); }
      })
    };
  });
