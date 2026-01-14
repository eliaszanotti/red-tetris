import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoomName } from "@/lib/generate-room-name";

export const Landing = () => {
	const navigate = useNavigate();
	const [playerName, setPlayerName] = useState("");
	const [joinRoomName, setJoinRoomName] = useState("");

	const handleCreateRoom = (e: FormEvent) => {
		e.preventDefault();
		if (!playerName.trim()) return;

		const roomName = generateRoomName();
		navigate(`/${roomName}/${playerName}`);
	};

	const handleJoinRoom = (e: FormEvent) => {
		e.preventDefault();
		if (!playerName.trim() || !joinRoomName.trim()) return;

		navigate(`/${joinRoomName}/${playerName}`);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a2e] text-white p-5">
			<div className="bg-[#16213e] p-10 rounded-lg shadow-2xl w-full max-w-100">
				<h1 className="text-center m-0 mb-8 text-blue-600 text-2xl">
					RED TETRIS
				</h1>

				{/* Player name input */}
				<form onSubmit={handleCreateRoom}>
					<div className="mb-5">
						<label className="block mb-2 text-sm">
							Ton pseudo *
						</label>
						<input
							type="text"
							value={playerName}
							onChange={(e) => setPlayerName(e.target.value)}
							placeholder="Ex: Elias"
							required
							className="w-full p-3 rounded border-2 border-[#0f3460] bg-[#0f3460] text-white text-base box-border"
						/>
					</div>

					{/* Create room button */}
					<button
						type="submit"
						disabled={!playerName.trim()}
						className="w-full p-3 text-base bg-[#e94560] text-white border-0 rounded cursor-pointer font-bold disabled:cursor-not-allowed disabled:opacity-50 mb-5"
					>
						Créer une room
					</button>
				</form>

				{/* Divider */}
				<div className="flex items-center my-5">
					<div className="flex-1 h-px bg-[#0f3460]"></div>
					<span className="px-2.5 text-[#888] text-sm">OU</span>
					<div className="flex-1 h-px bg-[#0f3460]"></div>
				</div>

				{/* Join room form */}
				<form onSubmit={handleJoinRoom}>
					<div className="mb-5">
						<label className="block mb-2 text-sm">
							Nom de la room *
						</label>
						<input
							type="text"
							value={joinRoomName}
							onChange={(e) => setJoinRoomName(e.target.value)}
							placeholder="Ex: RedTetris123"
							required
							className="w-full p-3 rounded border-2 border-[#0f3460] bg-[#0f3460] text-white text-base box-border"
						/>
					</div>

					<button
						type="submit"
						disabled={!playerName.trim() || !joinRoomName.trim()}
						className="w-full p-3 text-base bg-[#0f3460] text-white border-2 border-[#e94560] rounded font-bold disabled:cursor-not-allowed disabled:opacity-50"
					>
						Rejoindre
					</button>
				</form>
			</div>
		</div>
	);
};
