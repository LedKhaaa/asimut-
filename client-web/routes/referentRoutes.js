const express = require('express');
const router = express.Router();
const referentController = require('../controllers/referentController');

router.get('/', referentController.index);
router.post('/round-robin', referentController.roundRobin);

module.exports = router;