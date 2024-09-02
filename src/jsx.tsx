import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import PeriodicTable from './components/PeriodicTable';
import '../static/demo/styles.css';
import {dropElementsTable, getDatabase, setupDatabase} from '../data/setupDatabase';
import UserForm from "./components/UserForm";

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
        <UserForm />
        <PeriodicTable />
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