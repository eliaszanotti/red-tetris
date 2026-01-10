import { Socket } from 'socket.io';
import { Piece } from './Piece.js';

export interface Spectrum {
    heights: number[];
}

export class Player {
    private id: string;
    private name: string;
    private socket: Socket;
    private board: number[][];
    private currentPiece: Piece | null;
    private isAlive: boolean;
    private score: number;

    constructor(id: string, name: string, socket: Socket) {
        this.id = id;
        this.name = name;
        this.socket = socket;
        this.board = this.createEmptyBoard();
        this.currentPiece = null;
        this.isAlive = true;
        this.score = 0;
    }

    private createEmptyBoard(): number[][] {
        return Array(20).fill(null).map(() => Array(10).fill(0));
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getSocket(): Socket {
        return this.socket;
    }

    getBoard(): number[][] {
        return this.board.map(row => [...row]);
    }

    getCurrentPiece(): Piece | null {
        return this.currentPiece;
    }

    setCurrentPiece(piece: Piece): void {
        this.currentPiece = piece;
    }

    isPlayerAlive(): boolean {
        return this.isAlive;
    }

    setAlive(alive: boolean): void {
        this.isAlive = alive;
    }

    getScore(): number {
        return this.score;
    }

    getSpectrum(): Spectrum {
        const heights: number[] = [];

        for (let col = 0; col < 10; col++) {
            let height = 0;
            for (let row = 0; row < 20; row++) {
                if (this.board[row][col] !== 0) {
                    height = 20 - row;
                    break;
                }
            }
            heights.push(height);
        }

        return { heights };
    }

    // Check if piece can be placed at position
    canPlacePiece(piece: Piece, offsetX: number = 0, offsetY: number = 0): boolean {
        const shape = piece.getShape();
        const pos = piece.getPosition();
        const newX = pos.x + offsetX;
        const newY = pos.y + offsetY;

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardY = newY + row;
                    const boardX = newX + col;

                    // Check boundaries
                    if (boardX < 0 || boardX >= 10 || boardY >= 20) {
                        return false;
                    }

                    // Check collision with existing blocks
                    if (boardY >= 0 && this.board[boardY][boardX] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // Lock piece to board
    lockPiece(piece: Piece): void {
        const shape = piece.getShape();
        const pos = piece.getPosition();

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardY = pos.y + row;
                    const boardX = pos.x + col;
                    if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
                        this.board[boardY][boardX] = 1;
                    }
                }
            }
        }
    }

    // Clear completed lines and return number of lines cleared
    clearLines(): number {
        let linesCleared = 0;

        for (let row = 19; row >= 0; row--) {
            if (this.board[row].every(cell => cell !== 0)) {
                this.board.splice(row, 1);
                this.board.unshift(Array(10).fill(0));
                linesCleared++;
                row++; // Check same row again
            }
        }

        return linesCleared;
    }

    // Add penalty lines at bottom
    addPenaltyLines(count: number): void {
        // Remove top rows, add gray lines at bottom
        for (let i = 0; i < count; i++) {
            this.board.shift();
            this.board.push(Array(10).fill(2)); // 2 = penalty block
        }
    }

    reset(): void {
        this.board = this.createEmptyBoard();
        this.currentPiece = null;
        this.isAlive = true;
        this.score = 0;
    }
}
