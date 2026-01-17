import type { Room } from "../../../types/state.js";

export function createServerState(): Map<string, Room> {
	return new Map();
}

export function getOrCreateRoom(
	state: Map<string, Room>,
	roomId: string,
): Room {
	if (!state.has(roomId)) {
		state.set(roomId, {
			id: roomId,
			host: "",
			isPlaying: false,
			players: new Map(),
			createdAt: new Date(),
		});
	}
	return state.get(roomId)!;
}
