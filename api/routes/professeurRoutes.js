const express = require('express');
const router = express.Router();
const professeurController = require('../controllers/professeurController');

router.get('/', professeurController.getAllProfesseurs);
router.get('/:id', professeurController.getProfesseurById);
router.get('/:id/eleves', professeurController.getElevesParProfesseur);
router.post('/', professeurController.createProfesseur);
router.put('/:id', professeurController.updateProfesseur);
router.delete('/:id', professeurController.deleteProfesseur);

module.exports = router;