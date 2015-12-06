'use strict';

var express = require('express');
var controller = require('./produit.controller');

var router = express.Router();

router.get('/', controller.balanceMoiLaListeDeTousLesProduits);
router.get('/:id', controller.montreMoiUnProduitUnique);
router.post('/', controller.creeUnNouveauProduit);
router.put('/:id', controller.metAjourUnProduitExistant);
router.patch('/:id', controller.metAjourUnProduitExistant);
router.delete('/:id', controller.destructionSansReflechirDeUnProduit);

module.exports = router;
