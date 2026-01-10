import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { Game } from './Game.js';
import { GameManager } from './GameManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production'
            ? undefined
            : ['http://localhost:5173', 'http://localhost:4173'],
        credentials: true
    }
});

// Serve the client in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../../app/dist')));
}

const gameManager = new GameManager(io);

io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join_game', ({ room, playerName }: { room: string; playerName: string }) => {
        gameManager.joinGame(socket, room, playerName);
    });

    socket.on('start_game', ({ room }: { room: string }) => {
        gameManager.startGame(room);
    });

    socket.on('player_input', ({ room, input }: { room: string; input: PlayerInput }) => {
        gameManager.handleInput(socket, room, input);
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        gameManager.handleDisconnect(socket);
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export type PlayerInput = {
    type: 'move_left' | 'move_right' | 'rotate' | 'soft_drop' | 'hard_drop';
};
