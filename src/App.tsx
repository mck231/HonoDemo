import { FC, useState } from 'hono/jsx';
import PeriodicTable from "./components/PeriodicTable";
import UserForm from "./components/UserForm";
import ElementInfo from "./components/ElementInfo";

interface CounterProps {
    initialDate: string;
}

const Counter: FC<CounterProps> = ({ initialDate }) => {
    const [count, setCount] = useState(0);
    const [dateStr, setDateStr] = useState(initialDate); // Manage the date as a state

    function updateDate() {
        setDateStr(Date.now().toString()); // Update the date state on button click
    }
    return (
        <div>
            <h2>{dateStr}</h2>
            <p>Count: {count}</p>
            <button onClick={() => {
                setCount(count + 1);
                updateDate();
            }}>Increment</button>
        </div>
    );
}

export const App: FC = () => {
    //let dateStr = Date.now().toString();

    const [selectedElementId, setSelectedElementId] = useState<number | null>(null);

    // This function will be passed to PeriodicTable to set the selected element
    const handleElementClick = (elementId: number) => {
        setSelectedElementId(elementId);
    };
    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/*<Counter initialDate={dateStr}/>*/}
                <UserForm/>
                <ElementInfo elementId={selectedElementId}/> {/* Pass the selected element ID to ElementInfo */}
            </div>

            <PeriodicTable onElementClick={handleElementClick}/> {/* Pass the handler to PeriodicTable */}
        </div>
    );
};
