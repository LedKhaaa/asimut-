const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');
const stageController = require('../controllers/stageController');

router.get('/:id/stages', stageController.getStagesByEleve);
router.get('/', eleveController.getAllEleves);
router.get('/:id', eleveController.getEleveById);
router.post('/', eleveController.createEleve);
router.put('/:id', eleveController.updateEleve);
router.delete('/:id', eleveController.deleteEleve);

module.exports = router;