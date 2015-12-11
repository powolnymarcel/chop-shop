'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var commandeCtrlStub = {
  index: 'commandeCtrl.index',
  show: 'commandeCtrl.show',
  create: 'commandeCtrl.create',
  update: 'commandeCtrl.update',
  destroy: 'commandeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var commandeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './commande.controller': commandeCtrlStub
});

describe('Commande API Router:', function() {

  it('should return an express router instance', function() {
    commandeIndex.should.equal(routerStub);
  });

  describe('GET /api/commandes', function() {

    it('should route to commande.controller.index', function() {
      routerStub.get
                .withArgs('/', 'commandeCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/commandes/:id', function() {

    it('should route to commande.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'commandeCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/commandes', function() {

    it('should route to commande.controller.create', function() {
      routerStub.post
                .withArgs('/', 'commandeCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/commandes/:id', function() {

    it('should route to commande.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'commandeCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/commandes/:id', function() {

    it('should route to commande.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'commandeCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/commandes/:id', function() {

    it('should route to commande.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'commandeCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
