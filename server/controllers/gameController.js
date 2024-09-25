const Game = require('../models/Game');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = (moves) => {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            return moves[a]; // Return the winner ('X' or 'O')
        }
    }
    return null; // No winner
};

exports.createGame = async (req, res) => {
    try {
        const newGame = new Game({
            moves: Array(9).fill(null),
            winner: null  // Initialize winner as null
        });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        console.error("Error creating game:", error);
        res.status(500).json({ error: "Error creating game" });
    }
};

exports.makeMove = async (req, res) => {
    const { gameId, index, player } = req.body;
    try {
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }

        // Check if the game is already over
        if (game.winner) {
            return res.status(400).json({ error: "Game is already over" });
        }

        // Check if the move is valid
        if (game.moves[index] === null) {
            game.moves[index] = player; // Make the move
            const winner = checkWinner(game.moves); // Check for a winner

            if (winner) {
                game.winner = winner; // Set the winner
                await game.save(); // Save the game state
                return res.json({ message: "Game over", winner }); // Return the winner
            }

            await game.save(); // Save the game state without a winner
            return res.json({ message: "Move made", game }); // Return updated game state
        } else {
            return res.status(400).json({ error: "Invalid move" });
        }
    } catch (error) {
        console.error("Error making move:", error);
        res.status(500).json({ error: "Error making move" });
    }
};
