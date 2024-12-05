import { Request, Response } from "express";
import { Database } from "sqlite";
import {addHoursServer, getHoursServer, updateHoursServer} from "./sleep-utils";

export function createSleepEndpoints(app: any, db: Database){
    app.post("/sleepLogs", async (req: Request, res: Response) => {
        addHoursServer(req, res, db);
    });

    app.get("/sleepLogs", async (req: Request, res: Response) => {
        getHoursServer(req, res, db);
    });

    app.patch("/sleepLogs", async (req: Request, res: Response) => {
        updateHoursServer(req, res, db);
    });
}