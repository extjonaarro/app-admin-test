import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const apiRootDirectory = resolve(currentDirectory, '..', '..');
const dataDirectory = resolve(apiRootDirectory, 'data');
const databaseFilePath = resolve(dataDirectory, 'app.db');

mkdirSync(dataDirectory, { recursive: true });

const db = new Database(databaseFilePath);

db.pragma('foreign_keys = ON');

export { db, databaseFilePath };
