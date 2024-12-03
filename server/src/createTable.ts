import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
    // Open the database connection
    const db = await open({
        filename: "database.sqlite",
        driver: sqlite3.Database,
    });

    // TODO change to actual format
    await db.exec(`
        CREATE TABLE IF NOT EXISTS main (        
            id TEXT PRIMARY KEY,
            account TEXT NOT NULL,
            password TEXT NOT NULL
        );
    `);

    // Table to store each user's sleep data
    //account creation will be added later
    await db.exec(`
        CREATE TABLE IF NOT EXISTS sleeplog (
            date DATE,
            hours INT,
        );
    `);
    // await db.exec(`
    //     CREATE TABLE IF NOT EXISTS sleeplog (
    //         account TEXT,
    //         date DATE,
    //         hours INT,
    //         PRIMARY KEY (account, DATE),
    //         FOREIGN KEY (account) REFERENCES main(account)
    //     );
    // `);

    return db;
};

export default initDB;
