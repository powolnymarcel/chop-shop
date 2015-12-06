/**
 * Produit model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Produit = require('./produit.model');
var ProduitEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProduitEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Produit.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProduitEvents.emit(event + ':' + doc._id, doc);
    ProduitEvents.emit(event, doc);
  }
}

module.exports = ProduitEvents;
