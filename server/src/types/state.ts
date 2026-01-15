import type { Socket } from 'socket.io';
import type { Piece } from '../Piece.js';

// ============== SESSION ==============
/**
 * Une session représente un joueur connecté avec son socket
 * Une session peut rejoindre une game
 */
export interface Session {
	id: string;           // socket.id
	playerName: string;
	socket: Socket;
	joinedAt: Date;
}

// ============== GAME ==============
export interface Spectrum {
	heights: number[];
}

export interface PlayerInGame {
	id: string;
	name: string;
	spectrum: Spectrum;
	isAlive: boolean;
	board: number[][];
	currentPiece: Piece | null;
}

export interface Game {
	id: string;                    // room name
	host: string;                  // socket.id du host
	isPlaying: boolean;
	players: Map<string, PlayerInGame>;
	pieceSequence: string[];
	currentPieceIndex: number;
	createdAt: Date;
}

// ============== SERVER STATE ==============
/**
 * État global du serveur
 * Contient toutes les sessions et toutes les games
 */
export interface ServerState {
	sessions: Map<string, Session>;    // socket.id -> Session
	games: Map<string, Game>;          // room -> Game
}

export class ServerStateClass {
	sessions: Map<string, Session> = new Map();
	games: Map<string, Game> = new Map();

	constructor() {
		this.sessions = new Map();
		this.games = new Map();
	}

	// Sessions
	addSession(session: Session): void {
		this.sessions.set(session.id, session);
	}

	removeSession(sessionId: string): void {
		this.sessions.delete(sessionId);
	}

	getSession(sessionId: string): Session | undefined {
		return this.sessions.get(sessionId);
	}

	// Games
	addGame(game: Game): void {
		this.games.set(game.id, game);
	}

	removeGame(room: string): void {
		this.games.delete(room);
	}

	getGame(room: string): Game | undefined {
		return this.games.get(room);
	}

	getOrCreateGame(room: string): Game {
		if (!this.games.has(room)) {
			this.games.set(room, {
				id: room,
				host: '',
				isPlaying: false,
				players: new Map(),
				pieceSequence: [],
				currentPieceIndex: 0,
				createdAt: new Date(),
			});
		}
		return this.games.get(room)!;
	}
}
