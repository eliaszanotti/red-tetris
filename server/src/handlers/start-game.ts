import type { Socket } from 'socket.io';
import type { Room } from '../types/state.js';

interface StartGameParams {
	room: string;
}

export const handleStartGame = (
	socket: Socket,
	state: Map<string, Room>,
	params: StartGameParams,
) => {
	console.log('[start-game] Received:', { socketId: socket.id, ...params });
};
