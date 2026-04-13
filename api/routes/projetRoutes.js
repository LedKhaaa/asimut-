const express = require('express');
const router = express.Router();
const projetController = require('../controllers/projetController');

// Liste de tous les projets (pour le select dans le formulaire)
router.get('/', projetController.getAllProjets);

// Projets d'un élève
router.get('/eleve/:id', projetController.getProjetsByEleve);

// Ajouter un projet à un élève
router.post('/eleve/:id', projetController.addProjetToEleve);

// Retirer un projet d'un élève
router.delete('/eleve/:id/:id_projet', projetController.removeProjetFromEleve);

module.exports = router;