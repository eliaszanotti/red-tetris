import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import { GameRoomClient } from "./components/GameRoomClient";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/:room/:playerName" element={<GameRoomClient />} />
			</Routes>
		</BrowserRouter>
	);
}
