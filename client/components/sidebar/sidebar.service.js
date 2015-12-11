angular.module('chopShopApp')
  .factory('Catalog', function ($resource) {
    return $resource('/api/catalogs/:id');
  });
