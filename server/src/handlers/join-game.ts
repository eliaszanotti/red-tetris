import type { Socket } from "socket.io";
import { getOrCreateRoom } from "../types/state.js";
import type { Room } from "../types/state.js";

interface JoinGameParams {
	room: string;
	playerName: string;
}

export const handleJoinGame = (
	socket: Socket,
	state: Map<string, Room>,
	params: JoinGameParams,
	io: any,
) => {
	const { room, playerName } = params;

	console.log("[join-game] Received:", {
		socketId: socket.id,
		room,
		playerName,
	});

	// Créer la room
	const roomState = getOrCreateRoom(state, room);

	// Premier joueur = host
	if (roomState.host === "") {
		roomState.host = socket.id;
	}

	// Ajouter le joueur au state
	roomState.players.set(socket.id, {
		id: socket.id,
		name: playerName,
		socket,
		board: Array(20).fill(null).map(() => Array(10).fill(0)),
		currentPiece: null,
		isAlive: true,
		spectrum: { heights: Array(10).fill(0) },
	});

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
