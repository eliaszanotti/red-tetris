import type { Socket } from 'socket.io';
import type { Room } from '../types/state.js';

export const handleDisconnect = (
	socket: Socket,
	state: Map<string, Room>,
) => {
	console.log('[disconnect] Received:', { socketId: socket.id });
};
