import type { Socket } from "socket.io";
import type { ServerState } from "@/types/state";

interface PlayerInputParams {
	room: string;
	input: { type: string };
}

export const handlePlayerInput = (
	socket: Socket,
	state: ServerState,
	params: PlayerInputParams,
) => {
	console.log("[player-input] Received:", { socketId: socket.id, ...params });
};
