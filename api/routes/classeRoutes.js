const express = require('express');
const router = express.Router();
const classeController = require('../controllers/classeController');

router.get('/', classeController.getAllClasses);
router.get('/:id', classeController.getClasseById);
router.get('/:id/eleves', classeController.getElevesParClasse);
router.post('/', classeController.createClasse);
router.put('/:id', classeController.updateClasse);
router.delete('/:id', classeController.deleteClasse);

module.exports = router;