const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

// Route générale pour lister toutes les options disponibles
router.get('/', optionController.getAllOptions);

module.exports = router;