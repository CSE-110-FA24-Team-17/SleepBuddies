import { Request, Response } from "express";
import { Database } from "sqlite";

export async function addHoursServer(req: Request, res: Response, db: Database){
    try {
        // need to figure out data format
        const {date, hours} = req.body as {date: string, hours: number};

        if (!date || !hours){
            return res.status(400).send({error: "missing fields"});
        }

        const formattedDate = new Date(date).toISOString();

        await db.run("INSERT INTO sleeplog (date, hours) VALUES (?, ?);", [formattedDate, hours]);

        res.status(200).send({formattedDate, hours});

    } catch (error) {
        return res.status(400).send({error: `Hours could not be created and added, + ${error}`});
    }
}

export async function getHoursServer(req: Request, res: Response, db: Database){
    const hours = await db.all("SELECT * FROM sleeplog");
    res.status(200).send({"data": hours});
}
