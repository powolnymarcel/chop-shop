'use strict';

var app = require('../../app');
var request = require('supertest');

var newProduit;
var validProduitAttributes = {
  title: 'Produit1',
  price: 100.00
};

var updateProduitAttributes = {
  title: 'Produit 1 Updated',
  price: 200.00
}

describe('Produit API:', function() {

  describe('GET /api/produits', function() {
    var produits;

    beforeEach(function(done) {
      request(app)
        .get('/api/produits')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          produits = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      produits.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/produits', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/produits')
        .send(validProduitAttributes)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newProduit = res.body;
          done();
        });
    });

    it('should respond with the newly created produit', function() {
      for(var attribute in validProduitAttributes){
        newProduit[attribute].should.equal(validProduitAttributes[attribute]);
      }
    });

  });

  describe('GET /api/produits/:id', function() {
    var produit;

    beforeEach(function(done) {
      request(app)
        .get('/api/produits/' + newProduit._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          produit = res.body;
          done();
        });
    });

    afterEach(function() {
      produit = {};
    });

    it('should respond with the requested produit', function() {
      for(var attribute in validProduitAttributes){
        newProduit[attribute].should.equal(validProduitAttributes[attribute]);
      }
    });

  });

  describe('PUT /api/produits/:id', function() {
    var updatedProduit

    beforeEach(function(done) {
      request(app)
        .put('/api/produits/' + newProduit._id)
        .send(updateProduitAttributes)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProduit = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProduit = {};
    });

    it('should respond with the updated produit', function() {
      for(var attribute in updateProduitAttributes){
        updatedProduit[attribute].should.equal(updateProduitAttributes[attribute]);
      }
    });

  });

  describe('DELETE /api/produits/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/produits/' + newProduit._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when produit does not exist', function(done) {
      request(app)
        .delete('/api/produits/' + newProduit._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

