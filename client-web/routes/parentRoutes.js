const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

router.get('/publipostage', parentController.publipostageForm);
router.post('/publipostage', parentController.publipostageEnvoyer);

module.exports = router;