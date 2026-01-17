import type { Socket } from 'socket.io';
import type { Room } from '../types/state.js';

interface PlayerInputParams {
	room: string;
	input: { type: string };
}

export const handlePlayerInput = (
	socket: Socket,
	state: Map<string, Room>,
	params: PlayerInputParams,
) => {
	console.log('[player-input] Received:', { socketId: socket.id, ...params });
};
