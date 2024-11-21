import { Request, Response } from "express";
import { Database } from "sqlite";
import {addHoursServer, getHoursServer} from "./sleep-utils";

export function createSleepEndpoints(app: any, db: Database){
    app.post("/sleepLogs", (req: Request, res: Response) => {
        addHoursServer(req, res, db);
    });

    app.get("/sleepLogs", (req: Request, res: Response) => {
        getHoursServer(req, res, db);
    });
}