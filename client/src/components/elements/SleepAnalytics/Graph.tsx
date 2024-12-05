import React, { useState, useEffect, useCallback } from "react";
import { getLogs } from "./SleepLog";
import { Chart } from "react-google-charts";
import {type Log} from "./types";
// https://www.react-google-charts.com/docs/quick-walkthrough

export const Graph: React.FC<{ hoursSlept: number[], goal:number }> = ({ hoursSlept, goal }) =>{
    const [view, setView] = useState(true);

    //allow user to select which data to view
    const toggleView = useCallback(() => {
        setView((prevView) => !prevView);
    }, []);

    //so that toggle rerenders
    useEffect(() => {
        console.log("changed view to: ", view);
    }, [view]);

    const sleepData = [
        ["Day", "Hours", { role: "style" }],
        ["Sun", hoursSlept[0], hoursSlept[0] >= goal ? "#2DA84E" : "#E52B2B"],
        ["Mon", hoursSlept[1], hoursSlept[1] >= goal ? "#2DA84E" : "#E52B2B"],
        ["Tue", hoursSlept[2], hoursSlept[2] >= goal ? "#2DA84E" : "#E52B2B"],
        ["Wed", hoursSlept[3], hoursSlept[3] >= goal ? "#2DA84E" : "#E52B2B"],
        ["Thurs", hoursSlept[4], hoursSlept[4] >= goal ? "#2DA84E" : "#E52B2B"],
        ["Fri", hoursSlept[5], hoursSlept[5] >= goal ? "#2DA84E" : "#E52B2B"],
        ["Sat", hoursSlept[6], hoursSlept[6] >= goal ? "#2DA84E" : "#E52B2B"],
    ];

    const options = {
        title: view ? "Sleep Trends in a 1 Week Period" : "Sleep Trends in Total History",
        hAxis: {title: "Days"},
        vAxis: {title: "Hours"},
        backgroundColor: "white",
    };

    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await getLogs();
                setLogs(data);
            } catch (error) {
                console.error("Failed to fetch logs", error);
            }
        };

        fetchLogs();
    }, []);

    const allData = [
        ["Day", "Hours", { role: "style" }],
        ...logs.map((log) => {
            return [new Date(log.date).toISOString(), log.hours, log.hours >= goal ? "#2DA84E" : "#E52B2B"];
        }),
    ];

    return (
        <>
            <h2>Sleep Throughout the Week</h2>
            <Chart
                chartType="ColumnChart"
                data={view ? sleepData : allData}
                options={options}
            />
            <br></br>
            <button onClick={toggleView}>Switch Views</button>
        </>
    );
};