'use strict';

describe('Controller: ProduitsCtrl', function () {

  // load the controller's module
  beforeEach(module('chopShopApp'));

  var ProduitsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProduitsCtrl = $controller('ProduitsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
