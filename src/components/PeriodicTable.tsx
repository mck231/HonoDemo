import { FC, useEffect, useState } from 'hono/jsx';

interface PeriodicTableProps {
    onElementClick: (elementId: number) => void;
}

const PeriodicTable: FC<PeriodicTableProps> = ({ onElementClick }) => {
    const [elements, setElements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await fetch('/api/elements');
                const data = await response.json();
                setElements(data);
            } catch (error) {
                console.error('Error fetching elements:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchElements();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const elementsJSX = elements.map((el: any) => (
        <div
            key={el.atomic_number}
            onClick={() => onElementClick(el.element_id)} // Trigger the click handler
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
                cursor: 'pointer' // Add a pointer cursor for clarity
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
