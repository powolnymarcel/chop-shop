'use strict';

var app = require('..\..\app');
var request = require('supertest');

var newBraintree;

describe('Braintree API:', function() {

  describe('GET /api/braintrees', function() {
    var braintrees;

    beforeEach(function(done) {
      request(app)
        .get('/api/braintrees')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          braintrees = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      braintrees.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/braintrees', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/braintrees')
        .send({
          name: 'New Braintree',
          info: 'This is the brand new braintree!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBraintree = res.body;
          done();
        });
    });

    it('should respond with the newly created braintree', function() {
      newBraintree.name.should.equal('New Braintree');
      newBraintree.info.should.equal('This is the brand new braintree!!!');
    });

  });

  describe('GET /api/braintrees/:id', function() {
    var braintree;

    beforeEach(function(done) {
      request(app)
        .get('/api/braintrees/' + newBraintree._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          braintree = res.body;
          done();
        });
    });

    afterEach(function() {
      braintree = {};
    });

    it('should respond with the requested braintree', function() {
      braintree.name.should.equal('New Braintree');
      braintree.info.should.equal('This is the brand new braintree!!!');
    });

  });

  describe('PUT /api/braintrees/:id', function() {
    var updatedBraintree

    beforeEach(function(done) {
      request(app)
        .put('/api/braintrees/' + newBraintree._id)
        .send({
          name: 'Updated Braintree',
          info: 'This is the updated braintree!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBraintree = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBraintree = {};
    });

    it('should respond with the updated braintree', function() {
      updatedBraintree.name.should.equal('Updated Braintree');
      updatedBraintree.info.should.equal('This is the updated braintree!!!');
    });

  });

  describe('DELETE /api/braintrees/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/braintrees/' + newBraintree._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when braintree does not exist', function(done) {
      request(app)
        .delete('/api/braintrees/' + newBraintree._id)
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
