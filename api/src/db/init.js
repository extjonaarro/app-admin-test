import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db, databaseFilePath } from '../config/database.js';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const schemaFilePath = resolve(currentDirectory, 'schema.sql');
const seedFilePath = resolve(currentDirectory, 'seed.sql');

function initializeDatabase() {
  const schemaSql = readFileSync(schemaFilePath, 'utf-8');
  const seedSql = readFileSync(seedFilePath, 'utf-8');

  db.exec(schemaSql);
  db.exec(seedSql);
}

initializeDatabase();

console.log(`SQLite database initialized at ${databaseFilePath}`);
