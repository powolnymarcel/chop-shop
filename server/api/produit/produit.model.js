'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProduitSchema = new Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 1 },
  vedette: { type: Boolean, default: false },
  description: String,
  imageBin: { data: Buffer, contentType: String },
  imageUrl: String,
  categories: [{ type: Schema.Types.ObjectId,
    ref: 'Catalog', index: true }]
}).index({
  'title': 'text',
  'description': 'text'
});

module.exports = mongoose.model('Produit', ProduitSchema);


