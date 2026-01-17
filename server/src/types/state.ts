import type { Socket } from "socket.io";
import type { Piece } from "../Piece.js";

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

// ============== ROOM ==============
export interface Room {
	id: string;
	host: string;
	isPlaying: boolean;
	players: Map<string, PlayerInRoom>;
	createdAt: Date;
}

// ============== SERVER STATE ==============
/**
 * État global du serveur
 * Contient toutes les rooms
 */
export interface ServerState {
	rooms: Map<string, Room>;
}

export class ServerStateClass {
	rooms: Map<string, Room> = new Map();

	constructor() {
		this.rooms = new Map();
	}

	// Rooms
	addRoom(room: Room): void {
		this.rooms.set(room.id, room);
	}

	removeRoom(roomId: string): void {
		this.rooms.delete(roomId);
	}

	getRoom(roomId: string): Room | undefined {
		return this.rooms.get(roomId);
	}

	getOrCreateRoom(roomId: string): Room {
		if (!this.rooms.has(roomId)) {
			this.rooms.set(roomId, {
				id: roomId,
				host: "",
				isPlaying: false,
				players: new Map(),
				createdAt: new Date(),
			});
		}
		return this.rooms.get(roomId)!;
	}
}
