interface Piece {
    type: string;
    position: { x: number; y: number };
    shape: number[][];
}

interface GameBoardProps {
    board: number[][];
    currentPiece: Piece | null;
}

export const GameBoard = ({ board, currentPiece }: GameBoardProps) => {
    const safeBoard = board ?? Array(20).fill(null).map(() => Array(10).fill(0));

    // Create display board with piece overlay
    const displayBoard = safeBoard.map(row => [...row]);

    if (currentPiece) {
        const { shape, position } = currentPiece;
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const boardY = position.y + row;
                    const boardX = position.x + col;
                    if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
                        displayBoard[boardY][boardX] = 3; // 3 = current piece
                    }
                }
            }
        }
    }

    const getCellColor = (cell: number): string => {
        switch (cell) {
            case 0: return '#16213e';
            case 1: return '#0f3460';
            case 2: return '#e94560'; // penalty line
            case 3: return '#00ff88'; // current piece
            default: return '#16213e';
        }
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 30px)',
            gridTemplateRows: 'repeat(20, 30px)',
            gap: '1px',
            backgroundColor: '#0f3460',
            padding: '5px',
            borderRadius: '5px'
        }}>
            {displayBoard.flat().map((cell, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: getCellColor(cell),
                        borderRadius: '2px'
                    }}
                />
            ))}
        </div>
    );
};
