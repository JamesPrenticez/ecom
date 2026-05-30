import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import env from './env';

const dbPath = path.resolve(process.cwd(), env.DATABASE_PATH);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export default db;
