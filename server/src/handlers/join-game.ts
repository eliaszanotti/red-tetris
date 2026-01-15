import type { Socket } from 'socket.io';
import type { ServerStateClass } from '../types/state.js';
import type { Player } from '../Player.js';

interface JoinGameParams {
	room: string;
	playerName: string;
}

export const handleJoinGame = (
	socket: Socket,
	state: ServerStateClass,
	params: JoinGameParams,
	PlayerClass: new (id: string, name: string, socket: Socket) => Player,
	io: any,
) => {
	const { room, playerName } = params;

	console.log('[join-game] Received:', { socketId: socket.id, room, playerName });

	// Créer la session
	state.addSession({
		id: socket.id,
		playerName,
		socket,
		joinedAt: new Date(),
	});

	// Récupérer ou créer la game
	const game = state.getOrCreateGame(room);

	// Ajouter le player à la game
	const player = new PlayerClass(socket.id, playerName, socket);
	game.players.set(socket.id, {
		id: socket.id,
		name: playerName,
		spectrum: { heights: [] },
		isAlive: true,
		board: player.getBoard(),
		currentPiece: null,
	});

	// Premier joueur = host
	if (game.players.size === 1) {
		game.host = socket.id;
	}

	// Rejoindre la room socket
	socket.join(room);

	// Notifier tout le monde
	io.to(room).emit('player_joined', {
		id: socket.id,
		name: playerName,
	});

	io.to(room).emit('game_state', {
		id: game.id,
		players: Array.from(game.players.values()).map((p) => ({
			id: p.id,
			name: p.name,
			spectrum: p.spectrum,
			isAlive: p.isAlive,
		})),
		host: game.host,
		isPlaying: game.isPlaying,
	});

	// Log le state complet
	console.log('[join-game] Server state:', JSON.stringify(state, null, 2));
};
