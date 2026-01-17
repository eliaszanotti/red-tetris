import type { Room, ServerState } from "red-tetris-types/state";

export function getOrCreateRoom(
	state: ServerState,
	roomId: string,
): Room {
	const existingRoom = state.find((r) => r.id === roomId);
	if (!existingRoom) {
		const newRoom: Room = {
			id: roomId,
			host: "",
			isPlaying: false,
			players: [],
			createdAt: new Date(),
		};
		state.push(newRoom);
		return newRoom;
	}
	return existingRoom;
}
