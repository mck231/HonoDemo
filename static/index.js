import { render } from 'hono/jsx/dom';
import { useState } from 'hono/jsx';

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

function App() {
    return (
        <div>
            <Counter />
        </div>
    );
}

const root = document.getElementById('root');
render(<App />, root);
