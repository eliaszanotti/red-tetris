import type { Spectrum } from '../lib/socket';

interface Player {
    name: string;
    spectrum: Spectrum;
    isAlive: boolean;
}

interface OpponentsPanelProps {
    players: Player[];
    currentName: string;
}

export const OpponentsPanel = ({ players, currentName }: OpponentsPanelProps) => {
    const opponents = players.filter(p => p.name !== currentName);

    if (opponents.length === 0) {
        return (
            <div style={{
                backgroundColor: '#16213e',
                padding: '20px',
                borderRadius: '5px',
                minWidth: '200px'
            }}>
                <h3 style={{ margin: '0 0 15px 0' }}>Opponents</h3>
                <p style={{ color: '#888' }}>No opponents yet</p>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: '#16213e',
            padding: '20px',
            borderRadius: '5px',
            minWidth: '200px'
        }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Opponents</h3>
            {opponents.map(opponent => (
                <div key={opponent.name} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 'bold' }}>{opponent.name}</span>
                        {!opponent.isAlive && (
                            <span style={{ color: '#e94560', fontSize: '12px' }}>ELIMINATED</span>
                        )}
                    </div>
                    <SpectrumView heights={opponent.spectrum.heights} />
                </div>
            ))}
        </div>
    );
};

interface SpectrumViewProps {
    heights: number[];
}

const SpectrumView = ({ heights }: SpectrumViewProps) => {
    const maxHeight = Math.max(...heights, 1);

    return (
        <div style={{
            display: 'flex',
            gap: '2px',
            alignItems: 'flex-end',
            height: '100px',
            borderBottom: '2px solid #0f3460'
        }}>
            {heights.map((height, index) => (
                <div
                    key={index}
                    style={{
                        width: '8px',
                        height: `${(height / maxHeight) * 100}px`,
                        backgroundColor: '#0f3460',
                        borderRadius: '2px 2px 0 0'
                    }}
                />
            ))}
        </div>
    );
};
