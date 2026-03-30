const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

router.get('/', eleveController.getAllEleves);
router.get('/:id', eleveController.getEleveById);
router.post('/', eleveController.createEleve);
router.put('/:id', eleveController.updateEleve);
router.delete('/:id', eleveController.deleteEleve);

module.exports = router;