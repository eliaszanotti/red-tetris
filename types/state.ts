import type { Socket } from "socket.io";
import { Piece } from "./piece";

export interface Player {
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
	players: Player[];
	createdAt: Date;
}

export type ServerState = Room[];
