'use strict';

angular.module('chopShopApp')
  .directive('panier', function () {
    return {
      templateUrl: 'components/ngcart/panier.html',
      restrict: 'E',
      controller: 'CartController'
    };
  });

