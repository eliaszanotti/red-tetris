import type { Socket } from 'socket.io';
import type { ServerStateClass } from '../types/state.js';

interface StartGameParams {
	room: string;
}

export const handleStartGame = (
	socket: Socket,
	state: ServerStateClass,
	params: StartGameParams,
) => {
	console.log('[start-game] Received:', { socketId: socket.id, ...params });
};
