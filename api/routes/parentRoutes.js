const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

router.get('/', parentController.getAllParents);
router.get('/:id', parentController.getParentById);
router.get('/:id/eleves', parentController.getElevesParParent);
router.post('/', parentController.createParent);
router.put('/:id', parentController.updateParent);
router.delete('/:id', parentController.deleteParent);
router.post('/publipostage', parentController.publipostage);
module.exports = router;