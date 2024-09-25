const express = require('express');
const gameController = require('../controllers/gameController');
const router = express.Router();

router.post('/create', gameController.createGame);
router.post('/move', gameController.makeMove);

module.exports = router;
