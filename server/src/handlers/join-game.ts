import type { Socket } from "socket.io";
import { getOrCreateRoom } from "../lib/get-or-create-room";
import type { ServerState } from "red-tetris-types/state";

interface JoinGameParams {
	room: string;
	playerName: string;
}

export const handleJoinGame = (
	socket: Socket,
	state: ServerState,
	params: JoinGameParams,
	io: any,
) => {
	const { room, playerName } = params;

	console.log("[join-game] Received:", {
		socketId: socket.id,
		room,
		playerName,
	});

	const roomState = getOrCreateRoom(state, room);

	const existingPlayer = Array.from(roomState.players.values()).find(
		(p) => p.name === playerName,
	);

	if (existingPlayer) {
		existingPlayer.socket = socket;
		roomState.players.delete(existingPlayer.id);
		existingPlayer.id = socket.id;
		roomState.players.set(socket.id, existingPlayer);
		console.log("[join-game] Player reconnected:", playerName);
	} else {
		if (roomState.host === "") {
			roomState.host = socket.id;
		}

		roomState.players.set(socket.id, {
			id: socket.id,
			name: playerName,
			socket,
			board: Array(20)
				.fill(null)
				.map(() => Array(10).fill(0)),
			currentPiece: null,
			isAlive: true,
			spectrum: { heights: Array(10).fill(0) },
		});
	}

	// Rejoindre la room socket
	socket.join(room);

	// Notifier tout le monde
	io.to(room).emit("player_joined", {
		id: socket.id,
		name: playerName,
	});

	io.to(room).emit("game_state", {
		id: roomState.id,
		players: Array.from(roomState.players.values()).map((p) => ({
			id: p.id,
			name: p.name,
			spectrum: p.spectrum,
			isAlive: p.isAlive,
		})),
		host: roomState.host,
		isPlaying: roomState.isPlaying,
	});

	// Log le state complet
	console.log("[join-game] Server state:", {
		roomId: roomState.id,
		host: roomState.host,
		isPlaying: roomState.isPlaying,
		playersCount: roomState.players.size,
		players: Array.from(roomState.players.values()).map((p) => ({
			id: p.id,
			name: p.name,
			isAlive: p.isAlive,
		})),
	});
};
