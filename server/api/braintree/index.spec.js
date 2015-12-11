'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var braintreeCtrlStub = {
  index: 'braintreeCtrl.index',
  show: 'braintreeCtrl.show',
  create: 'braintreeCtrl.create',
  update: 'braintreeCtrl.update',
  destroy: 'braintreeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var braintreeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './braintree.controller': braintreeCtrlStub
});

describe('Braintree API Router:', function() {

  it('should return an express router instance', function() {
    braintreeIndex.should.equal(routerStub);
  });

  describe('GET /api/braintrees', function() {

    it('should route to braintree.controller.index', function() {
      routerStub.get
                .withArgs('/', 'braintreeCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/braintrees/:id', function() {

    it('should route to braintree.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'braintreeCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/braintrees', function() {

    it('should route to braintree.controller.create', function() {
      routerStub.post
                .withArgs('/', 'braintreeCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/braintrees/:id', function() {

    it('should route to braintree.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'braintreeCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/braintrees/:id', function() {

    it('should route to braintree.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'braintreeCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/braintrees/:id', function() {

    it('should route to braintree.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'braintreeCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
