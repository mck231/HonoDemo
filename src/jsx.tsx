import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import PeriodicTable from './components/PeriodicTable';
import '../static/demo/styles.css';
import {dropElementsTable, getDatabase, setupDatabase} from '../data/setupDatabase';
import UserForm from "./components/UserForm";
import {App} from "./App";

const app = new Hono();

// Setup the database
setupDatabase().catch((err) => {
    console.error('Error setting up database:', err);
});

app.use('/static/*', serveStatic({ root: './' }));

// API Endpoint to get all elements
app.get('/api/elements', async (c) => {
    const db = getDatabase();
    const elements = db.query('SELECT * FROM elements').all();
    return c.json(elements);
});

app.get('/api/element/:element_id', async (c) => {
    const db = getDatabase();
    const elementId = c.req.param('element_id'); // Get the atomic number from the URL
    const element = db.query('SELECT * FROM elements WHERE element_id = ?').get(elementId);

    if (element) {
        return c.json(element);
    } else {
        return c.json({ error: 'Element not found' }, 404);
    }
});

// Here we'll do the wikipedia api search for element info
app.get('/api/wiki/:element_name', async (c) => {
    const elementName = c.req.param('element_name');
    const response = await fetch(`https://api.wikimedia.org/core/v1/wikipedia/en/page/${elementName}/description`,
        {headers: {'Authorization': `Bearer ${process.env.Access_token}`}});
    const data = await response.json();
    return c.json(data);
});

// Route to serve the main HTML page
app.get('/', (c) => {
    return c.html(
        <html>
        <head>
            <title>Periodic Table</title>
            <link rel="stylesheet" href="/static/demo/styles.css" />
            <style>
                {`
                    body { font-family: Arial, sans-serif; }
                `}
            </style>
        </head>
        <body>
        <div id="root">
            <App /> {/* Render the App component on the server */}

        </div>
        <script src="/static/client.js" type="module"></script>
        </body>
        </html>
    );
});

// Handle shutdown gracefully
const gracefulShutdown = async () => {
    try {
        console.log('Shutting down the application...');
        await dropElementsTable();
        console.log('Database table dropped successfully.');
        process.exit(0); // Exit process
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1); // Exit process with error
    }
};

// Listen for termination signals
process.on('SIGINT', gracefulShutdown); // Catch Ctrl+C (Interrupt signal)
process.on('SIGTERM', gracefulShutdown); // Catch kill command (Termination signal)


const port = parseInt(process.env.PORT!) || 3000;
console.log(`Running at http://localhost:${port}`);

export default {
    port,
    fetch: app.fetch,
};