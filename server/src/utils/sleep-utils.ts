import { Request, Response } from "express";
import { Database } from "sqlite";

export async function addHoursServer(req: Request, res: Response, db: Database){
    try {
        const {date, hours} = req.body as {date: string, hours: number};

        if (!date || !hours){
            return res.status(400).send({error: "missing fields"});
        }

        const formattedDate = new Date(date).toISOString();

        await db.run("INSERT INTO sleepLogs (date, hours) VALUES (?, ?);", [formattedDate, hours]);

        res.status(200).send({formattedDate, hours});

    } catch (error) {
        return res.status(400).send({error: `Hours could not be created and added, + ${error}`});
    }
}

export async function getHoursServer(req: Request, res: Response, db: Database){
    const hours = await db.all("SELECT * FROM sleepLogs");
    res.status(200).send({"data": hours});
}

export async function updateHoursServer(req: Request, res: Response, db: Database) {
    try {
        const { date, hours } = req.body as { date: string, hours: number };

        if (!date || !hours) {
            return res.status(400).send({ error: "Missing fields" });
        }

        const formattedDate = new Date(date).toISOString();

        const existingLog = await db.get("SELECT * FROM sleepLogs WHERE date = ?", [formattedDate]);

        if (existingLog) {
            await db.run("UPDATE sleepLogs SET hours = ? WHERE date = ?", [hours, formattedDate]);
            return res.status(200).send({ message: "hours updated", date: formattedDate, hours });
        } else {
            return res.status(404).send({ error: "hours not found" });
        }
    } catch (error) {
        return res.status(400).send({ error: `Hours could not be updated, + ${error}` });
    }
}