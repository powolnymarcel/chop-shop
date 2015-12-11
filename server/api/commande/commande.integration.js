'use strict';

var app = require('..\..\app');
var request = require('supertest');

var newCommande;

describe('Commande API:', function() {

  describe('GET /api/commandes', function() {
    var commandes;

    beforeEach(function(done) {
      request(app)
        .get('/api/commandes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          commandes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      commandes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/commandes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/commandes')
        .send({
          name: 'New Commande',
          info: 'This is the brand new commande!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCommande = res.body;
          done();
        });
    });

    it('should respond with the newly created commande', function() {
      newCommande.name.should.equal('New Commande');
      newCommande.info.should.equal('This is the brand new commande!!!');
    });

  });

  describe('GET /api/commandes/:id', function() {
    var commande;

    beforeEach(function(done) {
      request(app)
        .get('/api/commandes/' + newCommande._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          commande = res.body;
          done();
        });
    });

    afterEach(function() {
      commande = {};
    });

    it('should respond with the requested commande', function() {
      commande.name.should.equal('New Commande');
      commande.info.should.equal('This is the brand new commande!!!');
    });

  });

  describe('PUT /api/commandes/:id', function() {
    var updatedCommande

    beforeEach(function(done) {
      request(app)
        .put('/api/commandes/' + newCommande._id)
        .send({
          name: 'Updated Commande',
          info: 'This is the updated commande!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCommande = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCommande = {};
    });

    it('should respond with the updated commande', function() {
      updatedCommande.name.should.equal('Updated Commande');
      updatedCommande.info.should.equal('This is the updated commande!!!');
    });

  });

  describe('DELETE /api/commandes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/commandes/' + newCommande._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when commande does not exist', function(done) {
      request(app)
        .delete('/api/commandes/' + newCommande._id)
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
