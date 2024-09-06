import { Database } from 'bun:sqlite';
import { readFile } from 'fs/promises';
import { join } from 'path';

let db: Database;

export async function setupDatabase() {
    db = new Database('periodic_table.db'); // Initialize the SQLite database

    await db.run(`
        CREATE TABLE IF NOT EXISTS elements (
            element_id INTEGER PRIMARY KEY AUTOINCREMENT,
            \`group\` TINYINT,
            period TINYINT,
            atomic_number TINYINT NOT NULL,
            atomic_mass DECIMAL(10,8) NOT NULL,
            symbol VARCHAR(2) NOT NULL,
            name VARCHAR(45) NOT NULL,
            grid_position TINYINT NOT NULL
        )
    `);

    const seedDataPath = join(import.meta.dir, 'seed-data.sql');
    const seedData = await readFile(seedDataPath, 'utf-8');
    await db.exec(seedData); // Run the seed SQL file

    console.log('Database setup and seeding complete.');
}

export async function dropElementsTable() {
    if (db) {
        await db.run('DROP TABLE IF EXISTS elements');
        console.log('Elements table dropped.');
    }
}

export function getDatabase() {
    return db;
}
