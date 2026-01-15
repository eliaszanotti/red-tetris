import type { Socket } from 'socket.io';
import type { ServerStateClass } from '../types/state.js';

interface PlayerInputParams {
	room: string;
	input: { type: string };
}

export const handlePlayerInput = (
	socket: Socket,
	state: ServerStateClass,
	params: PlayerInputParams,
) => {
	console.log('[player-input] Received:', { socketId: socket.id, ...params });
};
