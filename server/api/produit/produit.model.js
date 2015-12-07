'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProduitSchema = new Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 1 },
  description: String,
  imageBin: { data: Buffer, contentType: String },
  imageUrl: String
});

module.exports = mongoose.model('Produit', ProduitSchema);


