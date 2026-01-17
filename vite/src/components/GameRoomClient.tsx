import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { PlayerList } from "./PlayerList";

type Player = {
	id: string;
	name: string;
	board: number[][];
	currentPiece: unknown;
	isAlive: boolean;
	spectrum: { heights: number[] };
};

type RoomState = {
	id: string;
	host: string;
	isPlaying: boolean;
	players: Player[];
};

export const GameRoomClient = () => {
	const { room, playerName } = useParams<{
		room: string;
		playerName: string;
	}>();

	const [isConnected, setIsConnected] = useState(false);
	const [roomState, setRoomState] = useState<RoomState | null>(null);

	useEffect(() => {
		if (!room || !playerName) return;

		const socket: Socket = io("http://localhost:3000");

		socket.on("connect", () => {
			setIsConnected(true);
			socket.emit("join_game", { room, playerName });
		});

		socket.on("game_state", (state: RoomState) => {
			setRoomState(state);
		});

		socket.on("player_joined", (player: Player) => {
			setRoomState((prev) =>
				prev ? { ...prev, players: [...prev.players, player] } : null,
			);
		});

		return () => {
			socket.disconnect();
		};
	}, [room, playerName]);

	if (!room || !playerName) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
				<p className="text-red-400">
					Invalid URL. Use: /:room/:playerName
				</p>
			</div>
		);
	}

	if (!isConnected) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-900">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
					<p className="text-white text-lg">
						Connecting to server...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			{/* Main area */}
			<div className="flex-1 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Red Tetris</h1>
					<p className="text-gray-400 mb-2">Room: {room}</p>
					<p className="text-gray-400">Player: {playerName}</p>
					{roomState?.isPlaying ? (
						<p className="text-green-400 mt-4">
							Game in progress...
						</p>
					) : (
						<p className="text-yellow-400 mt-4">
							Waiting for host to start...
						</p>
					)}
				</div>
			</div>

			{/* Players sidebar */}
			<div className="w-64 bg-gray-800 border-l border-gray-700 p-4">
				<h2 className="text-xl font-semibold mb-4">Players</h2>
				{roomState && (
					<PlayerList
						players={roomState.players}
						currentPlayerName={playerName}
						hostId={roomState.host}
					/>
				)}
			</div>
		</div>
	);
};
