import { useState, useEffect, useCallback, useRef } from 'react';
import { connect, disconnect, startGame, sendInput, type GameState, type Spectrum } from '../lib/socket';

interface Piece {
    type: string;
    position: { x: number; y: number };
    shape: number[][];
}

interface UseGameSocketReturn {
    players: Array<{
        name: string;
        spectrum: Spectrum;
        isAlive: boolean;
        isHost: boolean;
    }>;
    isPlaying: boolean;
    isHost: boolean;
    board: number[][];
    currentPiece: Piece | null;
    isGameOver: boolean;
    winner: string | null;
    startGame: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    rotate: () => void;
    softDrop: () => void;
    hardDrop: () => void;
}

export const useGameSocket = (room: string, playerName: string): UseGameSocketReturn => {
    const [players, setPlayers] = useState<UseGameSocketReturn['players']>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [board, setBoard] = useState<number[][]>(Array(20).fill(null).map(() => Array(10).fill(0)));
    const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const currentRoomRef = useRef(room);

    useEffect(() => {
        currentRoomRef.current = room;

        connect(room, playerName, {
            onGameState: (state: GameState) => {
                setPlayers(state.players.map(p => ({
                    name: p.name,
                    spectrum: p.spectrum,
                    isAlive: p.isAlive,
                    isHost: p.id === state.host
                })));
                setIsPlaying(state.isPlaying);
                setIsHost(state.host === state.players.find(pl => pl.name === playerName)?.id);
            },

            onNewPiece: (piece) => {
                const shape = getPieceShape(piece.type);
                setCurrentPiece({
                    type: piece.type,
                    position: piece.position,
                    shape
                });
            },

            onBoardUpdate: (update) => {
                setBoard(update.board);
            },

            onPieceUpdate: (update) => {
                setCurrentPiece(prev => prev ? { ...prev, position: update.position, shape: update.shape } : null);
            },

            onGameOver: () => {
                setIsGameOver(true);
            },

            onGameEnd: (data) => {
                setIsGameOver(false);
                setWinner(data.winner);
            }
        });

        return () => {
            disconnect();
        };
    }, [room, playerName]);

    const startGameFn = useCallback(() => {
        startGame(currentRoomRef.current);
    }, []);

    const sendInputFn = useCallback((type: string) => {
        sendInput(currentRoomRef.current, { type });
    }, []);

    const moveLeft = useCallback(() => sendInputFn('move_left'), [sendInputFn]);
    const moveRight = useCallback(() => sendInputFn('move_right'), [sendInputFn]);
    const rotate = useCallback(() => sendInputFn('rotate'), [sendInputFn]);
    const softDrop = useCallback(() => sendInputFn('soft_drop'), [sendInputFn]);
    const hardDrop = useCallback(() => sendInputFn('hard_drop'), [sendInputFn]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isPlaying || isGameOver) return;

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    moveLeft();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    moveRight();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    rotate();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    softDrop();
                    break;
                case ' ':
                    event.preventDefault();
                    hardDrop();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, isGameOver, moveLeft, moveRight, rotate, softDrop, hardDrop]);

    return {
        players,
        isPlaying,
        isHost,
        board,
        currentPiece,
        isGameOver,
        winner,
        startGame: startGameFn,
        moveLeft,
        moveRight,
        rotate,
        softDrop,
        hardDrop
    };
};

// Tetrimino shapes for rendering
const getPieceShape = (type: string): number[][] => {
    const shapes: Record<string, number[][]> = {
        I: [[1, 1, 1, 1]],
        O: [[1, 1], [1, 1]],
        T: [[0, 1, 0], [1, 1, 1]],
        S: [[0, 1, 1], [1, 1, 0]],
        Z: [[1, 1, 0], [0, 1, 1]],
        J: [[1, 0, 0], [1, 1, 1]],
        L: [[0, 0, 1], [1, 1, 1]]
    };
    return shapes[type] ?? shapes.I;
};
