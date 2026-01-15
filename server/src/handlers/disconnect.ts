import type { Socket } from 'socket.io';
import type { ServerStateClass } from '../types/state.js';

export const handleDisconnect = (
	socket: Socket,
	state: ServerStateClass,
) => {
	console.log('[disconnect] Received:', { socketId: socket.id });
};
