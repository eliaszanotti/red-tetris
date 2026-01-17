import type { Server, Socket } from "socket.io";
import type { ServerState } from "red-tetris-types/state";
import { handleJoinGame } from "@/handlers/join-game";
import { handleStartGame } from "@/handlers/start-game";
import { handlePlayerInput } from "@/handlers/player-input";
import { handleDisconnect } from "@/handlers/disconnect";

export function setupSocketIO(io: Server): void {
	const state: ServerState = [];
	io.on("connection", (socket: Socket) => {
		console.log("state", state);

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
