const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', userRoutes); // Changed to /api/auth for consistency
app.use('/api/games', gameRoutes); // Games routes

// MongoDB Connection
mongoose.connect('mongodb+srv://test:JUsbjVWeZLxsA8U7@cluster0.innzwio.mongodb.net/tictactoe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Create HTTP server and pass the Express app to it
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Load socket handlers
require('./sockets/gameSocket')(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
