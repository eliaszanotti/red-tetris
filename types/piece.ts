// Tetrimino shapes and colors
export const TETRIMINOS = {
    I: { shape: [[1, 1, 1, 1]], color: '#00f0f0' },
    O: { shape: [[1, 1], [1, 1]], color: '#f0f000' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' }
} as const;

export type TetriminoType = keyof typeof TETRIMINOS;

export class Piece {
    private type: TetriminoType;
    private x: number;
    private y: number;
    private shape: number[][];
    private color: string;

    constructor(type?: TetriminoType, x: number = 3, y: number = 0) {
        this.type = type ?? this.randomType();
        this.x = x;
        this.y = y;
        this.shape = TETRIMINOS[this.type].shape.map(row => [...row]);
        this.color = TETRIMINOS[this.type].color;
    }

    private randomType(): TetriminoType {
        const types: TetriminoType[] = Object.keys(TETRIMINOS) as TetriminoType[];
        return types[Math.floor(Math.random() * types.length)];
    }

    getShape(): number[][] {
        return this.shape.map(row => [...row]);
    }

    getColor(): string {
        return this.color;
    }

    getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    getType(): TetriminoType {
        return this.type;
    }

    moveLeft(): void {
        this.x--;
    }

    moveRight(): void {
        this.x++;
    }

    moveDown(): void {
        this.y++;
    }

    moveUp(): void {
        this.y--;
    }

    rotate(): void {
        // Rotate clockwise
        const rows = this.shape.length;
        const cols = this.shape[0].length;
        const rotated: number[][] = [];

        for (let col = 0; col < cols; col++) {
            const newRow: number[] = [];
            for (let row = rows - 1; row >= 0; row--) {
                newRow.push(this.shape[row][col]);
            }
            rotated.push(newRow);
        }

        this.shape = rotated;
    }

    // For creating a new piece with same type but different position
    static fromType(type: TetriminoType, x: number = 3, y: number = 0): Piece {
        return new Piece(type, x, y);
    }
}
