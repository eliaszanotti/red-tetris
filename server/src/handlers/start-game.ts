import type { Socket } from "socket.io";
import type { ServerState } from "@shared/state";

interface StartGameParams {
	room: string;
}

export const handleStartGame = (
	socket: Socket,
	state: ServerState,
	params: StartGameParams,
) => {
	console.log("[start-game] Received:", { socketId: socket.id, ...params });
};
