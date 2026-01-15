import type { Server, Socket } from 'socket.io';
import type { ServerStateClass } from './types/state.js';
import { handleJoinGame } from './handlers/join-game.js';

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
			// TODO: create start-game handler
			console.log('[start_game] Received:', params);
		});

		socket.on(
			'player_input',
			(params: { room: string; input: { type: string } }) => {
				// TODO: create player-input handler
				console.log('[player_input] Received:', params);
			},
		);

		socket.on('disconnect', () => {
			console.log('[disconnect] Client disconnected:', socket.id);
			// TODO: create disconnect handler
		});
	});
}
