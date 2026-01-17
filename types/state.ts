import type { Socket } from "socket.io";
import type { Piece } from "../server/src/Piece.js";

// ============== PLAYER IN ROOM ==============
export interface PlayerInRoom {
	id: string;
	name: string;
	socket: Socket;
	board: number[][];
	currentPiece: Piece | null;
	isAlive: boolean;
	spectrum: { heights: number[] };
}

// ============== PLAYER (sans socket pour le client) ==============
export interface Player {
	id: string;
	name: string;
	board: number[][];
	currentPiece: Piece | null;
	isAlive: boolean;
	spectrum: { heights: number[] };
}

// ============== ROOM ==============
export interface Room {
	id: string;
	host: string;
	isPlaying: boolean;
	players: Map<string, PlayerInRoom>;
	createdAt: Date;
}

// ============== SERVER STATE ==============
export type ServerState = Map<string, Room>;
