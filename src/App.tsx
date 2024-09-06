import { FC, useState } from 'hono/jsx';
import PeriodicTable from "./components/PeriodicTable";
import UserForm from "./components/UserForm";


function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export const App: FC = () => {
    return (
        <div>
            <h1>Counter Example</h1>
            <Counter />
            <UserForm />
            <PeriodicTable />
        </div>
    );
};
