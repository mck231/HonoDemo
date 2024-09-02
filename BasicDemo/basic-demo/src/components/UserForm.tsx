import { FC } from 'hono/jsx';

const UserForm: FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            <button id="fetch-button" style={{ marginBottom: '10px' }}>Fetch Elements</button>
            <textarea id="elements-textarea" readOnly style={{ width: '300px', height: '200px' }} />
            {/* Reference to the JS file */}
            <script src="/static/demo/userform.js"></script>
        </div>
    );
};

export default UserForm;