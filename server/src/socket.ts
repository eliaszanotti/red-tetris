import type { Server, Socket } from "socket.io";
import type { ServerState } from "@/types/state";
import { handleJoinGame } from "@/server/handlers/join-game";
import { handleStartGame } from "@/server/handlers/start-game";
import { handlePlayerInput } from "@/server/handlers/player-input";
import { handleDisconnect } from "@/server/handlers/disconnect";

export function setupSocketIO(io: Server): void {
	const state: ServerState = new Map();
	io.on("connection", (socket: Socket) => {
		console.log("state", state);
		// console.log("[connection] Client connected:", socket.id);

		socket.on(
			"join_game",
			(params: { room: string; playerName: string }) => {
				handleJoinGame(socket, state, params, io);
			},
		);

		socket.on("start_game", (params: { room: string }) => {
			handleStartGame(socket, state, params);
		});

		socket.on(
			"player_input",
			(params: { room: string; input: { type: string } }) => {
				handlePlayerInput(socket, state, params);
			},
		);

		socket.on("disconnect", () => {
			handleDisconnect(socket, state);
		});
	});
}
