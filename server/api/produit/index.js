'use strict';

var express = require('express');
var controller = require('./produit.controller');

var router = express.Router();

// Si le serveur "entend" que le client appelle une des routes ci-dessous, il activera l'action appropriée du controlleur concerné.
//J'ai expres choisi des noms assez long pour qu'il n'y ai pas d'ambiguité avec des get par ici et des get par là....
router.get('/', controller.balanceMoiLaListeDeTousLesProduits);
router.get('/:id', controller.montreMoiUnProduitUnique);
router.post('/', controller.creeUnNouveauProduit);
router.put('/:id', controller.metAjourUnProduitExistant);
router.patch('/:id', controller.metAjourUnProduitExistant);
router.delete('/:id', controller.destructionSansReflechirDeUnProduit);

module.exports = router;
