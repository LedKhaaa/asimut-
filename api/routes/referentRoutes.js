const express = require('express');
const router = express.Router();
const referentController = require('../controllers/referentController');

router.get('/', referentController.getAllReferents);
router.post('/round-robin', referentController.lancerRoundRobin);
router.post('/affecter', referentController.affecterReferent);
router.get('/:id_professeur/eleves', referentController.getElevesParReferent);
router.post('/', referentController.createReferent);
router.delete('/:id_professeur/:id_eleve', referentController.deleteReferent);

module.exports = router;