import { Response } from "express";
import initDB from "./createTable";

import { createSleepEndpoints } from "./sleep/sleep-endpoints";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Initialize the database and start the server
(async () => { const db = await initDB();

  // Root endpoint to get test if the server is running
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ "data": "Hello, TypeScript Express!" });
  });
  
  createSleepEndpoints(app, db); //access to database from sleep page
})();

export{}
