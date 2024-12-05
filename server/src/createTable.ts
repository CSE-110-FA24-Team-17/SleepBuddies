import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
    // Open the database connection
    const db = await open({
        filename: "database.sqlite",
        driver: sqlite3.Database,
    });

    // Create a table for the users
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (        
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            encryptedPw TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create the "journal" table for mood entries
    await db.exec(`
        CREATE TABLE IF NOT EXISTS journal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mood TEXT NOT NULL,
            entry TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    //create table for storing dates and hours
    await db.exec(`
        CREATE TABLE IF NOT EXISTS sleepLogs (        
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            hours DECIMAL NOT NULL
        );
    `);

    return db;
};

export default initDB;
