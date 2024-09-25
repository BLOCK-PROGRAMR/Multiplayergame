const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    moves: { type: [String], default: Array(9).fill(null) }
});

module.exports = mongoose.model('Game', gameSchema);
