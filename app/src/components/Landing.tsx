import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
	const navigate = useNavigate();
	const [playerName, setPlayerName] = useState("");
	const [joinRoomName, setJoinRoomName] = useState("");

	const generateRoomName = (): string => {
		const adjectives = [
			"Red",
			"Blue",
			"Green",
			"Golden",
			"Dark",
			"Cosmic",
			"Neon",
			"Pixel",
		];
		const nouns = [
			"Tetris",
			"Pelicans",
			"Blocks",
			"Racers",
			"Warriors",
			"Legends",
			"Masters",
			"Heroes",
		];
		const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
		const noun = nouns[Math.floor(Math.random() * nouns.length)];
		const number = Math.floor(Math.random() * 1000);
		return `${adj}${noun}${number}`;
	};

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				backgroundColor: "#1a1a2e",
				color: "white",
				padding: "20px",
			}}
		>
			<div
				style={{
					backgroundColor: "#16213e",
					padding: "40px",
					borderRadius: "10px",
					boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
					width: "100%",
					maxWidth: "400px",
				}}
			>
				<h1
					style={{
						textAlign: "center",
						margin: "0 0 30px 0",
						color: "#e94560",
						fontSize: "32px",
					}}
				>
					RED TETRIS
				</h1>

				{/* Player name input */}
				<form onSubmit={handleCreateRoom}>
					<div style={{ marginBottom: "20px" }}>
						<label
							style={{
								display: "block",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							Ton pseudo *
						</label>
						<input
							type="text"
							value={playerName}
							onChange={(e) => setPlayerName(e.target.value)}
							placeholder="Ex: Elias"
							required
							style={{
								width: "100%",
								padding: "12px",
								borderRadius: "5px",
								border: "2px solid #0f3460",
								backgroundColor: "#0f3460",
								color: "white",
								fontSize: "16px",
								boxSizing: "border-box",
							}}
						/>
					</div>

					{/* Create room button */}
					<button
						type="submit"
						disabled={!playerName.trim()}
						style={{
							width: "100%",
							padding: "12px",
							fontSize: "16px",
							backgroundColor: "#e94560",
							color: "white",
							border: "none",
							borderRadius: "5px",
							cursor: playerName.trim()
								? "pointer"
								: "not-allowed",
							opacity: playerName.trim() ? 1 : 0.5,
							marginBottom: "20px",
							fontWeight: "bold",
						}}
					>
						Créer une room
					</button>
				</form>

				{/* Divider */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						margin: "20px 0",
					}}
				>
					<div
						style={{
							flex: 1,
							height: "1px",
							backgroundColor: "#0f3460",
						}}
					></div>
					<span
						style={{
							padding: "0 10px",
							color: "#888",
							fontSize: "14px",
						}}
					>
						OU
					</span>
					<div
						style={{
							flex: 1,
							height: "1px",
							backgroundColor: "#0f3460",
						}}
					></div>
				</div>

				{/* Join room form */}
				<form onSubmit={handleJoinRoom}>
					<div style={{ marginBottom: "20px" }}>
						<label
							style={{
								display: "block",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							Nom de la room *
						</label>
						<input
							type="text"
							value={joinRoomName}
							onChange={(e) => setJoinRoomName(e.target.value)}
							placeholder="Ex: RedTetris123"
							required
							style={{
								width: "100%",
								padding: "12px",
								borderRadius: "5px",
								border: "2px solid #0f3460",
								backgroundColor: "#0f3460",
								color: "white",
								fontSize: "16px",
								boxSizing: "border-box",
							}}
						/>
					</div>

					<button
						type="submit"
						disabled={!playerName.trim() || !joinRoomName.trim()}
						style={{
							width: "100%",
							padding: "12px",
							fontSize: "16px",
							backgroundColor: "#0f3460",
							color: "white",
							border: "2px solid #e94560",
							borderRadius: "5px",
							cursor:
								playerName.trim() && joinRoomName.trim()
									? "pointer"
									: "not-allowed",
							opacity:
								playerName.trim() && joinRoomName.trim()
									? 1
									: 0.5,
							fontWeight: "bold",
						}}
					>
						Rejoindre
					</button>
				</form>
			</div>
		</div>
	);
};
