'use strict';

describe('Service: produits', function () {

  // load the service's module
  beforeEach(module('chopShopApp'));

  // instantiate service
  var produits;
  beforeEach(inject(function (_produits_) {
    produits = _produits_;
  }));

  it('should do something', function () {
    expect(!!produits).to.be.true;
  });

});
