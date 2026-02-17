import Database from "better-sqlite3";

const db = new Database("passwords.db");

// store the master password
db.exec(`
    CREATE TABLE IF NOT EXISTS master (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    hash TEXT NOT NULL
    );
`);

// store the passwords 
db.exec(`
    CREATE TABLE IF NOT EXISTS passwords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL 
    );
`);

export default db;