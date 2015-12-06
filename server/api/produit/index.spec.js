'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var produitCtrlStub = {
  index: 'produitCtrl.index',
  show: 'produitCtrl.show',
  create: 'produitCtrl.create',
  update: 'produitCtrl.update',
  destroy: 'produitCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var produitIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './produit.controller': produitCtrlStub
});

describe('Produit API Router:', function() {

  it('should return an express router instance', function() {
    produitIndex.should.equal(routerStub);
  });

  describe('GET /api/produits', function() {

    it('should route to produit.controller.index', function() {
      routerStub.get
                .withArgs('/', 'produitCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/produits/:id', function() {

    it('should route to produit.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'produitCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/produits', function() {

    it('should route to produit.controller.create', function() {
      routerStub.post
                .withArgs('/', 'produitCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/produits/:id', function() {

    it('should route to produit.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'produitCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/produits/:id', function() {

    it('should route to produit.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'produitCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/produits/:id', function() {

    it('should route to produit.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'produitCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
