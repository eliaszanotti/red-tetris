import { useParams } from 'react';
import { useGameSocket } from '../hooks/useGameSocket';
import { GameBoard } from './GameBoard';
import { OpponentsPanel } from './OpponentsPanel';

export const GameRoomClient = () => {
    const { room, playerName } = useParams<{ room: string; playerName: string }>();

    const gameState = useGameSocket(room ?? '', playerName ?? '');

    if (!room || !playerName) {
        return <div>Invalid URL. Use: /:room/:playerName</div>;
    }

    const isHost = gameState.players.find(p => p.name === playerName)?.isHost ?? false;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', padding: '20px' }}>
            <h1 style={{ margin: '0 0 20px 0' }}>Red Tetris</h1>
            <p style={{ margin: '0 0 20px 0' }}>Room: {room} | Player: {playerName}</p>

            {!gameState.isPlaying && isHost && (
                <button
                    onClick={() => gameState.startGame()}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#e94560',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginBottom: '20px'
                    }}
                >
                    Start Game
                </button>
            )}

            {!gameState.isPlaying && !isHost && (
                <p style={{ marginBottom: '20px' }}>Waiting for host to start...</p>
            )}

            <div style={{ display: 'flex', gap: '20px' }}>
                <GameBoard board={gameState.board} currentPiece={gameState.currentPiece} />
                <OpponentsPanel players={gameState.players} currentName={playerName} />
            </div>

            {gameState.winner && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#0f3460', padding: '40px', borderRadius: '10px', textAlign: 'center' }}>
                    <h2>{gameState.winner === playerName ? 'You Win!' : `${gameState.winner} Wins!`}</h2>
                </div>
            )}
        </div>
    );
};
