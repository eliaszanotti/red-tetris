import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ServerStateClass } from './types/state.js';
import { setupSocketIO } from './socket.js';
import { Player } from './Player.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin:
			process.env.NODE_ENV === 'production'
				? undefined
				: ['http://localhost:5173', 'http://localhost:4173'],
		credentials: true,
	},
});

// Serve the client in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(join(__dirname, '../../app/dist')));
}

// Global state
const state = new ServerStateClass();

// Setup socket.io handlers
setupSocketIO(io, state, Player);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export type PlayerInput = {
	type: 'move_left' | 'move_right' | 'rotate' | 'soft_drop' | 'hard_drop';
};
