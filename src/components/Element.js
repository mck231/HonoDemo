import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
const Element = ({ symbol, name, number }) => {
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
            width: '100px', // Fixed width
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
            flexGrow: 1, // Allow symbol to take up available space
            display: 'flex',
            alignItems: 'center', // Center symbol vertically
            justifyContent: 'center',
        },
        name: {
            fontSize: '0.9em',
            color: '#344',
            width: '100%',
            overflowWrap: 'anywhere',
            alignSelf: 'flex-end', // Align at the bottom
        },
    };
    return (_jsxs("div", { style: styles.element, children: [_jsx("div", { style: styles.number, children: number }), _jsx("div", { style: styles.symbol, children: symbol }), _jsx("div", { style: styles.name, children: name })] }));
};
export default Element;
