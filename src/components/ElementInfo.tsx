import { FC, useEffect, useState } from 'hono/jsx';

interface ElementInfoProps {
    elementId: number | null;
}

interface Element {
    element_id: number;
    group: number;
    period: number;
    atomic_number: number;
    atomic_mass: number;
    symbol: string;
    name: string;
    grid_position: number;
}

const ElementInfo: FC<ElementInfoProps> = ({ elementId }) => {
    const [element, setElement] = useState<Element | null>(null);

    useEffect(() => {
        if (elementId !== null) {
            const fetchElement = async () => {
                try {
                    const response = await fetch(`/api/element/${elementId}`);
                    const data = await response.json();
                    setElement(data);
                } catch (error) {
                    console.error('Error fetching element:', error);
                    setElement(null);
                }
            };

            fetchElement();
        }
    }, [elementId]); // Trigger the fetch when elementId changes

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            {element ? (
                <div style={{ width: '500', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', height: '400' }}>
                    <h3>Element Information for : {element.name}</h3>
                    <p><strong>Element Id:</strong> {element.element_id}</p>
                    <p><strong>Group:</strong> {element.group}</p>
                    <p><strong>Period:</strong> {element.period}</p>
                    <p><strong>Atomic Number:</strong> {element.atomic_number}</p>
                    <p><strong>Atomic Mass:</strong> {element.atomic_mass}</p>
                    <p><strong>Symbol:</strong> {element.symbol}</p>
                    <p><strong>Name:</strong> {element.name}</p>
                    <p><strong>Grid Position:</strong> {element.grid_position}</p>
                </div>
            ) : (
                <p>Select an element to view more info</p>
            )}
        </div>
    );
};

export default ElementInfo;
