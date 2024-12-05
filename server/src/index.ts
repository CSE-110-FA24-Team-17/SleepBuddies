import {Request, Response} from "express"; // Fix import
import initDB from "./createTable";
import {generateRandomHash} from "./utils/generateHash";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

// The public hash for this session
// TODO create secret for deployment
const sessionHash = generateRandomHash(10);

// set up rate limiter: maximum of five requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use(cors());
app.use(express.json());

// Initialize the database and start the server
(async () => {
    const db = await initDB(); // Ensure the database is initialized first

    // Root endpoint to test if the server is running
    app.get("/", (req: Request, res: Response) => {
        res.status(200).send({data: "Database for SleepBuddies. Session hash: " + sessionHash});
    });

    // GET endpoint: Retrieve all user info
    app.get("/users", async (req: Request, res: Response) => {
        try {
            const usersEntries = await db.all(`SELECT * FROM users ORDER BY timestamp DESC`);
            res.status(200).send(usersEntries);
            console.log("User entries retrieved successfully");
        } catch (err) {
            res.status(500).send({error: "Failed to retrieve user entries."});
        }
    });

    // POST endpoint: Create a new user
    app.post("/users", async (req: Request, res: Response) => {
        const {username, encryptedPw} = req.body;

        if (!username || !encryptedPw) {
            return res.status(400).send({error: "username and password are required."});
        }

        try {
            const result = await db.run(
                `INSERT INTO users (username, encryptedPw) VALUES (?, ?)`,
                [username, encryptedPw]
            );
            res.status(201).send({id: result.lastID, username, encryptedPw, timestamp: new Date().toISOString()});
        } catch (err) {
            res.status(500).send({error: "Failed to save the user."});
        }
    });

    // GET endpoint: Retrieve all journal entries
    app.get("/journal", async (req: Request, res: Response) => {
        try {
            const journalEntries = await db.all(`SELECT * FROM journal ORDER BY timestamp DESC`);
            res.status(200).send(journalEntries);
        } catch (err) {
            res.status(500).send({error: "Failed to retrieve journal entries."});
        }
    });

    // POST endpoint: Add a new journal entry
    app.post("/journal", async (req: Request, res: Response) => {
        const {mood, entry} = req.body;

        if (!mood || !entry) {
            return res.status(400).send({error: "Mood and entry are required."});
        }

        try {
            const result = await db.run(
                `INSERT INTO journal (mood, entry) VALUES (?, ?)`,
                [mood, entry]
            );
            res.status(201).send({id: result.lastID, mood, entry, timestamp: new Date().toISOString()});
        } catch (err) {
            res.status(500).send({error: "Failed to save the journal entry."});
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})(); 
