import type { Server, Socket } from 'socket.io';
import type { ServerStateClass } from './types/state.js';
import { handleJoinGame } from './handlers/join-game.js';
import { handleStartGame } from './handlers/start-game.js';
import { handlePlayerInput } from './handlers/player-input.js';
import { handleDisconnect } from './handlers/disconnect.js';

type PlayerClass = new (id: string, name: string, socket: Socket) => any;

export function setupSocketIO(
	io: Server,
	state: ServerStateClass,
	PlayerClass: PlayerClass,
): void {
	io.on('connection', (socket: Socket) => {
		console.log('[connection] Client connected:', socket.id);

		socket.on('join_game', (params: { room: string; playerName: string }) => {
			handleJoinGame(socket, state, params, PlayerClass, io);
		});

		socket.on('start_game', (params: { room: string }) => {
			handleStartGame(socket, state, params);
		});

		socket.on(
			'player_input',
			(params: { room: string; input: { type: string } }) => {
				handlePlayerInput(socket, state, params);
			},
		);

		socket.on('disconnect', () => {
			handleDisconnect(socket, state);
		});
	});
}
