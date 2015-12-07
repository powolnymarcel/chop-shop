'use strict';

var express = require('express');
var controller = require('./produit.controller');
//pour l'upload de fichier
var multiparty = require('connect-multiparty');
var uploadOptions = { autoFile: true,
  uploadDir: 'client/assets/uploads/'
}

var router = express.Router();


router.post('/:id/upload', multiparty(uploadOptions), controller.upload);



// Si le serveur "entend" que le client appelle une des routes ci-dessous, il activera l'action appropriée du controlleur concerné.
//J'ai expres choisi des noms assez long pour qu'il n'y ai pas d'ambiguité avec des get par ici et des get par là....
router.get('/', controller.balanceMoiLaListeDeTousLesProduits);
router.get('/:id', controller.montreMoiUnProduitUnique);
router.post('/', controller.creeUnNouveauProduit);
router.post('/:id/upload', multiparty(uploadOptions), controller.upload);
router.put('/:id', controller.metAjourUnProduitExistant);
router.patch('/:id', controller.metAjourUnProduitExistant);
router.delete('/:id', controller.destructionSansReflechirDeUnProduit);

module.exports = router;
