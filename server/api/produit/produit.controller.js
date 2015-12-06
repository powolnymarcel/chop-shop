/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/produits              ->  index
 * POST    /api/produits              ->  create
 * GET     /api/produits/:id          ->  show
 * PUT     /api/produits/:id          ->  update
 * DELETE  /api/produits/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Produit = require('./produit.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Produits
exports.balanceMoiLaListeDeTousLesProduits = function(req, res) {
  Produit.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Produit from the DB
exports.montreMoiUnProduitUnique = function(req, res) {
  Produit.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Produit in the DB
exports.creeUnNouveauProduit = function(req, res) {
  Produit.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Produit in the DB
exports.metAjourUnProduitExistant = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Produit.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Produit from the DB
exports.destructionSansReflechirDeUnProduit = function(req, res) {
  Produit.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
