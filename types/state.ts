import type { Socket } from "socket.io";
import type { Piece } from "../server/src/Piece.js";

export interface PlayerInRoom {
	id: string;
	name: string;
	socket: Socket;
	board: number[][];
	currentPiece: Piece | null;
	isAlive: boolean;
	spectrum: { heights: number[] };
}

export interface Room {
	id: string;
	host: string;
	isPlaying: boolean;
	players: Map<string, PlayerInRoom>;
	createdAt: Date;
}

export type ServerState = Map<string, Room>;
