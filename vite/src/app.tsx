import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/page";
import { GamePage } from "./pages/[room]/[name]/page";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/:room/:playerName" element={<GamePage />} />
			</Routes>
		</BrowserRouter>
	);
}
