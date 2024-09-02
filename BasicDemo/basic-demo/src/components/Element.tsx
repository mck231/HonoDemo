import type { FC } from 'hono/jsx';

const Element: FC<{ symbol: string; name: string; number: number }> = ({ symbol, name, number }) => {
    const styles = {
        element: {
            border: '1px solid #ccc',
            textAlign: 'center',
            backgroundColor: '#f4f4f4',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Distribute space between items
            alignItems: 'center',
            height: '140px', // Fixed height for rectangle shape
            width: '100px',   // Fixed width
            boxSizing: 'border-box',
            padding: '10px',
            overflow: 'hidden',
        },
        number: {
            fontSize: '0.8em',
            color: '#888',
        },
        symbol: {
            fontSize: '1.5em',
            fontWeight: 'bold',
            flexGrow: 1,             // Allow symbol to take up available space
            display: 'flex',
            alignItems: 'center',    // Center symbol vertically
            justifyContent: 'center',
        },
        name: {
            fontSize: '0.9em',
            color: '#344',
            width: '100%',
            overflowWrap: 'anywhere',
            alignSelf: 'flex-end',   // Align at the bottom
        },
    };

    return (
        <div style={styles.element}>
            <div style={styles.number}>{number}</div>
            <div style={styles.symbol}>{symbol}</div>
            <div style={styles.name}>{name}</div>
        </div>
    );
};

export default Element;