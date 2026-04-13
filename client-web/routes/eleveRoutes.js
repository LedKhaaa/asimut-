const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', eleveController.index);
router.get('/create', eleveController.create);
router.get('/stages', eleveController.stagesAlerte);
router.get('/import', eleveController.importForm);
router.post('/import', upload.single('fichier'), eleveController.importCSV);
router.post('/', eleveController.store);
router.get('/:id', eleveController.show);
router.get('/:id/edit', eleveController.edit);
router.post('/:id/edit', eleveController.update);
router.post('/:id/delete', eleveController.destroy);
router.post('/:id/options', eleveController.addOption);
router.post('/:id/options/:id_option/delete', eleveController.removeOption);
router.post('/:id/projets', eleveController.addProjet);
router.post('/:id/projets/:id_projet/delete', eleveController.removeProjet);

module.exports = router;