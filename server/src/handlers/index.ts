import type { ServerStateClass } from '../types/state.js';
import type { Player } from '../Player.js';
import { handleJoinGame } from './join-game.js';
import type { Socket } from 'socket.io';
import type { Server } from 'socket.io';

export type EventHandler = (
	socket: Socket,
	state: ServerStateClass,
	params: any,
	PlayerClass: new (id: string, name: string, socket: Socket) => Player,
	io: Server,
) => void;

export const eventHandlers: Record<string, EventHandler> = {
	join_game: handleJoinGame,
};

export function routeEvent(
	eventName: string,
	socket: Socket,
	state: ServerStateClass,
	params: any,
	PlayerClass: new (id: string, name: string, socket: Socket) => Player,
	io: Server,
): void {
	const handler = eventHandlers[eventName];
	if (handler) {
		handler(socket, state, params, PlayerClass, io);
	} else {
		console.log(`[router] No handler for event: ${eventName}`);
	}
}
