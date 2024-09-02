import { Database } from 'bun:sqlite'; // Using Bun's SQLite support
import { readFile } from 'fs/promises';
import path from 'path';

let db: Database;

export async function setupDatabase() {
    db = new Database('periodic_table.db');

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

    const seedDataPath = path.join(__dirname, 'seed-data.sql');
    const seedData = await readFile(seedDataPath, 'utf-8');
    await db.exec(seedData);

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