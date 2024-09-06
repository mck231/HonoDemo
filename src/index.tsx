import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import {App} from "./App";
import {setupDatabase} from "./data/setupDatabase";

const app = new Hono();


app.use('/static/*', serveStatic({ root: './' }));

app.get('/', (c) => {
    return c.html(
        <body>
            <h1>Counter Example with Hono JSX</h1>
                <div id="root">
                    <App /> {/* Render the App component on the server */}
                </div> 
            <script type="module" src="/static/client.js"></script>
        </body>
    );
});


const port = 3000;
console.log(`Server is running on port ${port}`);

export default {
    port,
    fetch: app.fetch,
};
