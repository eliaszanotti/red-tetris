import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

type SocketEventHandlers = {
    onGameState?: (state: GameState) => void;
    onNewPiece?: (piece: { type: string; position: { x: number; y: number } }) => void;
    onBoardUpdate?: (update: { board: number[][]; spectrum: Spectrum }) => void;
    onPieceUpdate?: (update: { position: { x: number; y: number }; shape: number[][] }) => void;
    onGameOver?: () => void;
    onGameEnd?: (data: { winner: string | null }) => void;
    onPlayerJoined?: (player: { id: string; name: string }) => void;
    onPlayerLeft?: (player: { id: string; name: string }) => void;
    onError?: (error: { message: string }) => void;
};

let socket: Socket | null = null;

export const connect = (room: string, playerName: string, handlers: SocketEventHandlers): Socket => {
    if (socket?.connected) {
        socket.disconnect();
    }

    socket = io(SERVER_URL, {
        autoConnect: true,
        reconnection: true
    });

    socket.on('connect', () => {
        console.log('Connected to server:', socket?.id);
        socket?.emit('join_game', { room, playerName });
    });

    socket.on('game_state', (state: GameState) => {
        handlers.onGameState?.(state);
    });

    socket.on('new_piece', (piece) => {
        handlers.onNewPiece?.(piece);
    });

    socket.on('board_update', (update) => {
        handlers.onBoardUpdate?.(update);
    });

    socket.on('piece_update', (update) => {
        handlers.onPieceUpdate?.(update);
    });

    socket.on('game_over', () => {
        handlers.onGameOver?.();
    });

    socket.on('game_end', (data) => {
        handlers.onGameEnd?.(data);
    });

    socket.on('player_joined', (player) => {
        handlers.onPlayerJoined?.(player);
    });

    socket.on('player_left', (player) => {
        handlers.onPlayerLeft?.(player);
    });

    socket.on('error', (error) => {
        handlers.onError?.(error);
    });

    return socket;
};

export const disconnect = (): void => {
    socket?.disconnect();
    socket = null;
};

export const startGame = (room: string): void => {
    socket?.emit('start_game', { room });
};

export const sendInput = (room: string, input: { type: string }): void => {
    socket?.emit('player_input', { room, input });
};

export const getSocket = (): Socket | null => socket;

// Types
export interface GameState {
    id: string;
    players: Array<{
        id: string;
        name: string;
        spectrum: Spectrum;
        isAlive: boolean;
    }>;
    host: string;
    isPlaying: boolean;
}

export interface Spectrum {
    heights: number[];
}
