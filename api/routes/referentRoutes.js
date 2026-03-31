const express = require('express');
const router = express.Router();
const referentController = require('../controllers/referentController');

router.get('/', referentController.getAllReferents);
router.post('/', referentController.createReferent);
router.delete('/:id_professeur/:id_eleve', referentController.deleteReferent);

module.exports = router;