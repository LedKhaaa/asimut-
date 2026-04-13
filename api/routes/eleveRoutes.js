const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const eleveController = require('../controllers/eleveController');
const stageController = require('../controllers/stageController');
const optionController = require('../controllers/optionController');

router.get('/:id/stages', stageController.getStagesByEleve);
router.get('/', eleveController.getAllEleves);
router.post('/import', upload.single('fichier'), eleveController.importCSV);
router.get('/:id', eleveController.getEleveById);
router.post('/', eleveController.createEleve);
router.put('/:id', eleveController.updateEleve);
router.delete('/:id', eleveController.deleteEleve);
router.get('/:id/options', optionController.getOptionsByEleve);
router.post('/:id/options', optionController.addOptionToEleve);
router.delete('/:id/options/:id_option', optionController.removeOptionFromEleve);

module.exports = router;