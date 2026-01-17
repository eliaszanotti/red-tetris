import type { Room, ServerState } from "@shared/state";

export function getOrCreateRoom(
	state: ServerState,
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
