'use strict';

describe('Controller: PrincipalCtrl', function() {

  // load the controller's module
  beforeEach(module('chopShopApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var PrincipalCtrl;
  var scope;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    PrincipalCtrl = $controller('PrincipalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function() {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).to.equal(4);
  });
});
