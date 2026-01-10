import { Server, Socket } from 'socket.io';
import { Game } from './Game.js';
import { Player } from './Player.js';
import type { PlayerInput } from './server.js';

export class GameManager {
    private io: Server;
    private games: Map<string, Game>;

    constructor(io: Server) {
        this.io = io;
        this.games = new Map();
    }

    getOrCreateGame(room: string): Game {
        if (!this.games.has(room)) {
            const game = new Game(room, this.io);
            this.games.set(room, game);
        }
        return this.games.get(room)!;
    }

    joinGame(socket: Socket, room: string, playerName: string): void {
        const game = this.getOrCreateGame(room);
        socket.join(room);

        const player = new Player(socket.id, playerName, socket);
        game.addPlayer(player);

        // Tell everyone in the room about the new player
        this.io.to(room).emit('player_joined', {
            id: player.getId(),
            name: player.getName()
        });
    }

    startGame(room: string): void {
        const game = this.games.get(room);
        if (!game) return;

        // Only host can start
        const host = game.getHost();
        const requestingSocket = this.io.sockets.sockets.get(Array.from(this.io.sockets.adapter.rooms.get(room)?.values() || [])[0]);

        if (host?.id !== requestingSocket?.id) {
            requestingSocket?.emit('error', { message: 'Only the host can start the game' });
            return;
        }

        game.start();
    }

    handleInput(socket: Socket, room: string, input: PlayerInput): void {
        const game = this.games.get(room);
        if (!game) return;

        game.handleInput(socket.id, input);
    }

    handleDisconnect(socket: Socket): void {
        // Find and remove player from all games
        for (const [room, game] of this.games.entries()) {
            const player = game.getPlayer(socket.id);
            if (player) {
                game.removePlayer(socket.id);
                this.io.to(room).emit('player_left', {
                    id: socket.id,
                    name: player.getName()
                });
            }
        }
    }
}
