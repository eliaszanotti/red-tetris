import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameRoomClient } from './components/GameRoomClient';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:room/:playerName" element={<GameRoomClient />} />
                <Route path="/" element={<Navigate to="/lobby/Player1" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
