import type { FC } from 'hono/jsx';
import { getDatabase } from '../../data/setupDatabase';

const PeriodicTable: FC = async () => {
    const db = getDatabase();
    const elementsInDb = db.query('SELECT * FROM elements ORDER BY grid_position').all();

    // Map each element to a JSX component
    const elementsJSX = elementsInDb.map((el: any) => (
        <div
            key={el.atomic_number}
            style={{
                border: '1px solid #ccc',
                textAlign: 'center',
                backgroundColor: '#f4f4f4',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '120px',
                width: '80px',
                padding: '10px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                gridColumnStart: el.grid_position % 18 + 1,
                gridRowStart: Math.floor(el.grid_position / 18) + 1,
            }}
        >
            <div style={{ fontSize: '0.8em', color: '#888' }}>{el.atomic_number}</div>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{el.symbol}</div>
            <div style={{ fontSize: '0.9em', color: '#333', overflowWrap: 'anywhere' }}>{el.name}</div>
        </div>
    ));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
            <h1>Periodic Table</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(18, 80px)',
                    gridTemplateRows: 'repeat(10, 120px)',
                    gap: '10px',
                    border: '1px solid black',
                    padding: '10px',
                    boxSizing: 'border-box',
                }}
            >
                {elementsJSX}
            </div>
        </div>
    );
};

export default PeriodicTable;