const express = require('express');
const router = express.Router({ mergeParams: true });
const moyenneController = require('../controllers/moyenneController');

router.get('/', moyenneController.getMoyennesByEleve);
router.post('/', moyenneController.createMoyenne);
router.put('/:mid/valider', moyenneController.validerMoyenne);

module.exports = router;