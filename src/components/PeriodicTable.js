import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { getDatabase } from "../testDatabase";
const PeriodicTable = async () => {
    const db = getDatabase();
    const elementsInDb = db.query('SELECT * FROM elements ORDER BY grid_position').all();
    // Map each element to a JSX component
    const elementsJSX = elementsInDb.map((el) => (_jsxs("div", { style: {
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
        }, children: [_jsx("div", { style: { fontSize: '0.8em', color: '#888' }, children: el.atomic_number }), _jsx("div", { style: { fontSize: '1.5em', fontWeight: 'bold' }, children: el.symbol }), _jsx("div", { style: { fontSize: '0.9em', color: '#333', overflowWrap: 'anywhere' }, children: el.name })] }, el.atomic_number)));
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px' }, children: [_jsx("h1", { children: "Periodic Table" }), _jsx("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(18, 80px)',
                    gridTemplateRows: 'repeat(10, 120px)',
                    gap: '10px',
                    border: '1px solid black',
                    padding: '10px',
                    boxSizing: 'border-box',
                }, children: elementsJSX })] }));
};
export default PeriodicTable;
