module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Player connected:', socket.id);

        socket.on('joinGame', (gameId) => {
            socket.join(gameId);
            console.log(`Player joined game: ${gameId}`);
        });

        socket.on('makeMove', ({ gameId, move }) => {
            io.to(gameId).emit('moveMade', move); // Notify all players in the game
        });

        socket.on('disconnect', () => {
            console.log('Player disconnected:', socket.id);
        });
    });
};
