var Produit = require('./produit.model.js');

describe('Produit', function() {
  beforeEach(function(done){
    Produit.remove(done); // remove all data
  });

  it('should not create without title', function(done) {
    Produit.create({price: 123.45}, function(err){
      err.should.not.be.empty;
      done();
    });
  });

  it('should remove trailing spaces from title', function(done){
    Produit.create({title: '  no space  ', price: 123},
      produitShouldHave('title', 'no space', done));
  });

  it('should default stock to 1', function(done){
    Produit.create({title: 'title', price: 123},
      produitShouldHave('stock', 1, done));
  });

  it('should not create without price', function(done) {
    Produit.create({title: 'no price'}, function(err){
      err.should.not.be.empty;
      done();
    });
  });

  it('should not allow negative price', function(done) {
    Produit.create({title: 'title', price: -123}, function(err){
      err.should.not.be.empty;
      done();
    });
  });

  it('should save a description', function(done){
    Produit.create({title: 'title', price: 123, description: 'le description'},
      produitShouldHave('description', 'le description', done));
  });
});

function produitShouldHave(name, value, done){
  return function(err){
    if(err) done(err);

    Produit.findOne({}, function(err, produit){
      if(err) done(err);
      produit.should.have.property(name, value);
      done();
    });
  }
}

