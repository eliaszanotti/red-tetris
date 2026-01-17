import type { Socket } from "socket.io";
import type { ServerState } from "red-tetris-types/state";

export const handleDisconnect = (
	socket: Socket,
	state: ServerState,
) => {
	console.log("[disconnect] Received:", { socketId: socket.id });
};
