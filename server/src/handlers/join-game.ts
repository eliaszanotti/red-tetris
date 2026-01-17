import type { Socket } from "socket.io";
import type { ServerStateClass } from "../types/state.js";
import type { Player } from "../Player.js";

interface JoinGameParams {
	room: string;
	playerName: string;
}

export const handleJoinGame = (
	socket: Socket,
	state: ServerStateClass,
	params: JoinGameParams,
	io: any,
) => {
	const { room, playerName } = params;

	console.log("[join-game] Received:", {
		socketId: socket.id,
		room,
		playerName,
	});

	// Récupérer ou créer la room
	const roomState = state.getOrCreateRoom(room);

	// Premier joueur = host
	if (roomState.players.size === 1) {
		roomState.host = socket.id;
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
	console.log("[join-game] Server state:", JSON.stringify(state, null, 2));
};
