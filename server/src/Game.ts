import { Server, Socket } from 'socket.io';
import { Player, Spectrum } from './Player.js';
import { Piece, TetriminoType } from './Piece.js';

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

export class Game {
    private id: string;
    private io: Server;
    private players: Map<string, Player>;
    private host: Socket | null;
    private isPlaying: boolean;
    private pieceSequence: TetriminoType[];
    private currentPieceIndex: number;

    constructor(id: string, io: Server) {
        this.id = id;
        this.io = io;
        this.players = new Map();
        this.host = null;
        this.isPlaying = false;
        this.pieceSequence = [];
        this.currentPieceIndex = 0;
    }

    getId(): string {
        return this.id;
    }

    addPlayer(player: Player): void {
        this.players.set(player.getId(), player);

        // First player becomes host
        if (this.players.size === 1) {
            this.host = player.getSocket();
        }

        this.emitState();
    }

    removePlayer(socketId: string): void {
        const player = this.players.get(socketId);
        if (!player) return;

        this.players.delete(socketId);

        // If host leaves, assign new host
        if (this.host?.id === socketId && this.players.size > 0) {
            this.host = this.players.values().next().value.getSocket();
        }

        // If no players left, game is over
        if (this.players.size === 0) {
            this.isPlaying = false;
        }

        this.emitState();
    }

    getPlayer(socketId: string): Player | undefined {
        return this.players.get(socketId);
    }

    getHost(): Socket | null {
        return this.host;
    }

    isGamePlaying(): boolean {
        return this.isPlaying;
    }

    private generatePieceSequence(): void {
        const types: TetriminoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        this.pieceSequence = [];
        this.currentPieceIndex = 0;

        // Generate 100 pieces
        for (let i = 0; i < 100; i++) {
            this.pieceSequence.push(types[Math.floor(Math.random() * types.length)]);
        }
    }

    private getNextPiece(): Piece {
        if (this.currentPieceIndex >= this.pieceSequence.length) {
            this.generatePieceSequence();
        }

        const type = this.pieceSequence[this.currentPieceIndex++];
        return new Piece(type);
    }

    start(): void {
        if (this.isPlaying) return;

        this.isPlaying = true;
        this.generatePieceSequence();

        // Give each player their first piece
        for (const player of this.players.values()) {
            const piece = this.getNextPiece();
            player.setCurrentPiece(piece);

            // Send piece to player
            player.getSocket().emit('new_piece', {
                type: piece.getType(),
                position: piece.getPosition()
            });
        }

        // Start game loop
        this.startGameLoop();

        this.emitState();
    }

    private gameLoopInterval: NodeJS.Timeout | null = null;

    private startGameLoop(): void {
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
        }

        this.gameLoopInterval = setInterval(() => {
            this.gameTick();
        }, 1000); // 1 second per tick
    }

    private stopGameLoop(): void {
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
            this.gameLoopInterval = null;
        }
    }

    private gameTick(): void {
        if (!this.isPlaying) {
            this.stopGameLoop();
            return;
        }

        // Move all pieces down
        for (const player of this.players.values()) {
            if (!player.isPlayerAlive()) continue;

            const piece = player.getCurrentPiece();
            if (!piece) continue;

            piece.moveDown();

            if (!player.canPlacePiece(piece)) {
                // Piece cannot move down, lock it
                piece.moveUp(); // Revert move
                player.lockPiece(piece);

                // Check for game over
                const linesCleared = player.clearLines();

                if (linesCleared > 0) {
                    // Send penalty lines to opponents
                    const penaltyLines = linesCleared - 1;
                    if (penaltyLines > 0) {
                        for (const otherPlayer of this.players.values()) {
                            if (otherPlayer.getId() !== player.getId()) {
                                otherPlayer.addPenaltyLines(penaltyLines);
                            }
                        }
                    }
                }

                // Get next piece
                const newPiece = this.getNextPiece();
                player.setCurrentPiece(newPiece);

                if (!player.canPlacePiece(newPiece)) {
                    // Game over for this player
                    player.setAlive(false);
                    player.getSocket().emit('game_over');
                } else {
                    // Send new piece to player
                    player.getSocket().emit('new_piece', {
                        type: newPiece.getType(),
                        position: newPiece.getPosition()
                    });
                }
            }
        }

        // Update all players with their board state
        for (const player of this.players.values()) {
            player.getSocket().emit('board_update', {
                board: player.getBoard(),
                spectrum: player.getSpectrum()
            });
        }

        // Update all players with opponents' spectrums
        this.emitState();

        // Check for game end
        const alivePlayers = Array.from(this.players.values()).filter(p => p.isPlayerAlive());
        if (alivePlayers.length <= 1) {
            this.endGame(alivePlayers[0]?.getId());
        }
    }

    handleInput(socketId: string, input: { type: string }): void {
        const player = this.players.get(socketId);
        if (!player || !player.isPlayerAlive() || !this.isPlaying) return;

        const piece = player.getCurrentPiece();
        if (!piece) return;

        switch (input.type) {
            case 'move_left':
                piece.moveLeft();
                if (!player.canPlacePiece(piece)) {
                    piece.moveRight();
                }
                break;

            case 'move_right':
                piece.moveRight();
                if (!player.canPlacePiece(piece)) {
                    piece.moveLeft();
                }
                break;

            case 'rotate':
                piece.rotate();
                if (!player.canPlacePiece(piece)) {
                    // Try wall kicks (simple version)
                    if (player.canPlacePiece(piece, -1, 0)) {
                        piece.moveLeft();
                    } else if (player.canPlacePiece(piece, 1, 0)) {
                        piece.moveRight();
                    } else if (player.canPlacePiece(piece, -2, 0)) {
                        piece.moveLeft();
                        piece.moveLeft();
                    } else if (player.canPlacePiece(piece, 2, 0)) {
                        piece.moveRight();
                        piece.moveRight();
                    } else {
                        // Revert rotation
                        piece.rotate();
                        piece.rotate();
                        piece.rotate();
                    }
                }
                break;

            case 'soft_drop':
                piece.moveDown();
                if (!player.canPlacePiece(piece)) {
                    piece.moveUp();
                }
                break;

            case 'hard_drop':
                while (player.canPlacePiece(piece)) {
                    piece.moveDown();
                }
                piece.moveUp();
                break;
        }

        // Send updated position to player
        player.getSocket().emit('piece_update', {
            position: piece.getPosition(),
            shape: piece.getShape()
        });
    }

    private endGame(winnerId: string | undefined): void {
        this.isPlaying = false;
        this.stopGameLoop();

        // Announce winner
        this.io.to(this.id).emit('game_end', {
            winner: winnerId ? this.players.get(winnerId)?.getName() : null
        });

        // Reset all players
        for (const player of this.players.values()) {
            player.reset();
        }
    }

    getState(): GameState {
        return {
            id: this.id,
            players: Array.from(this.players.values()).map(p => ({
                id: p.getId(),
                name: p.getName(),
                spectrum: p.getSpectrum(),
                isAlive: p.isPlayerAlive()
            })),
            host: this.host?.id ?? '',
            isPlaying: this.isPlaying
        };
    }

    private emitState(): void {
        this.io.to(this.id).emit('game_state', this.getState());
    }
}
