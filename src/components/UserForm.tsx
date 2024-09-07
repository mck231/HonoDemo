import { FC, useState } from 'hono/jsx';

const UserForm: FC = () => {
    const [elements, setElements] = useState<string>('');

    const fetchElements = async () => {
        try {
            const response = await fetch('/api/elements');
            const data = await response.json();
            setElements(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error fetching elements:', error);
            setElements('Error fetching elements');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            <button onClick={fetchElements} style={{ marginBottom: '10px' }}>Fetch All Elements</button>
            <textarea value={elements} readOnly style={{ width: '300px', height: '200px' }} />
        </div>
    );
};

export default UserForm;
