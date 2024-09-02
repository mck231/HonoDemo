import type { FC } from 'hono/jsx';
import { getDatabase } from '../../data/setupDatabase';

const PeriodicTable: FC = async () => {
    const db = getDatabase();
    const elementsInDb = db.query('SELECT * FROM elements ORDER BY grid_position').all();

    // Generate HTML for each cell in the grid using `grid_position`
    const elementsHTML = elementsInDb.map((el: any) => `
        <div style="
            border: 1px solid #ccc;
            text-align: center;
            background-color: #f4f4f4;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 120px;
            width: 80px;
            padding: 10px;
            box-sizing: border-box;
            overflow: hidden;
            grid-column-start: ${el.grid_position % 18 + 1};
            grid-row-start: ${Math.floor(el.grid_position / 18) + 1};
        ">
            <div style="font-size: 0.8em; color: #888;">${el.atomic_number}</div>
            <div style="font-size: 1.5em; font-weight: bold;">${el.symbol}</div>
            <div style="font-size: 0.9em; color: #333; overflow-wrap: anywhere;">${el.name}</div>
        </div>
    `).join('');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
            <h1>Periodic Table</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, 80px)', gridTemplateRows: 'repeat(10, 120px)', gap: '10px', border: '1px solid black', padding: '10px', boxSizing: 'border-box' }}
                 dangerouslySetInnerHTML={{ __html: elementsHTML }}>
            </div>
        </div>
    );
};

export default PeriodicTable;