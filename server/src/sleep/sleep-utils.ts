import { Request, Response } from "express";
import { Database } from "sqlite";

export async function addHoursServer(req: Request, res: Response, db: Database){
    try {
        // need to figure out data format
        const {account, date, hours} = req.body as {account: string, date: Date, hours: number};

        if (!account || !date || !hours){
            return res.status(400).send({error: "missing fields"});
        }

        await db.run("INSERT INTO sleeplog (test, ) VALUES (?, ?, ?);", [account, date, hours]);

        res.status(200).send({account, date, hours});

    } catch (error) {
        return res.status(400).send({error: `Hours could not be created and added, + ${error}`});
    }
}

export async function getHoursServer(req: Request, res: Response, db: Database){
    // need to figure out data format
    const hours = await db.all("SELECT * FROM sleeplog");
    res.status(200).send({"data": hours});
}

// export async function getWeeklyAverageServer(req: Request, res: Response, db: Database){
//     // need to figure out data format
//     // const hours;
//     res.status(200).send({});
// }