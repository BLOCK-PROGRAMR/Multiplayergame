import React, { useState, useEffect } from "react";
import Board from "./Board";
import { io } from 'socket.io-client';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [gameId, setGameId] = useState(null);
    const [winner, setWinner] = useState(null);
    const socket = io("http://localhost:5000"); // Adjust to your server URL

    useEffect(() => {
        const createGame = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/games/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                const gameData = await response.json();
                setGameId(gameData._id);
            } catch (error) {
                console.error("Error creating game:", error);
            }
        };

        createGame();

        socket.on('moveMade', ({ moves, winner }) => {
            setBoard(moves);
            if (winner) {
                setWinner(winner);
            }
        });

        return () => {
            socket.off('moveMade');
        };
    }, [socket]);

    const handleMove = async (index) => {
        if (board[index] || winner || !gameId) return; // Prevent overwriting a cell or making a move after game over

        const player = board.filter(Boolean).length % 2 === 0 ? "X" : "O"; // Determine player based on current moves
        const newBoard = [...board];
        newBoard[index] = player;

        try {
            const response = await fetch("http://localhost:5000/api/games/move", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameId, index, player }),
            });

            const data = await response.json();
            if (response.ok) {
                setBoard(data.game.moves);
                if (data.winner) {
                    setWinner(data.winner);
                }
                socket.emit('moveMade', { moves: data.game.moves, winner: data.winner });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Move error:", error);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        // Notify server to reset the game if needed
        socket.emit('resetGame', gameId);
    };

    return (
        <div className="game-container">
            <Board board={board} handleMove={handleMove} />
            <p className="text-center mt-4">
                {winner ? (
                    <span className="font-bold text-green-500">Winner: {winner}</span>
                ) : (
                    <span className="font-bold">Current Player: {board.filter(Boolean).length % 2 === 0 ? "X" : "O"}</span>
                )}
            </p>
            {winner && (
                <button onClick={resetGame} className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Reset Game
                </button>
            )}
        </div>
    );
};

export default Game;
