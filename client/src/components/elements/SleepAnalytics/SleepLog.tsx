import React, { useState, useEffect } from "react";

import  { fetchHours } from "../../../utils/sleep-utils";

type Log = {
    date: Date;
    hours: number;
}

//hard code for testing
const sleepGoal = 8;

export const SleepLog = () => {
    const [dates, setDates] = useState<Log[]>([]);
    const [average, setAverage] = useState(0);
    const [percentAchieved, setPercentAchieved] = useState(0);

    useEffect(() => {
        loadHours();
    }, []);

    const loadHours = async () => {
        try {
            const hoursList: Log[] = await fetchHours();
            setDates(hoursList);

        } catch (error: any){
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (dates.length > 0) {
            const totalHours = dates.reduce((sum, log) => sum + log.hours, 0);
            const avgHours = totalHours / dates.length;
            setAverage(avgHours);

            const achieved = (avgHours / sleepGoal) * 100;
            setPercentAchieved(achieved);
        }
    }, [dates, sleepGoal])

    return (
        <>
            <h2>Your Sleep Journey</h2>

            <h4>Average Hours Slept: {average.toFixed(1)}</h4>

            <h4>Sleep Goal: {sleepGoal}</h4>

            <h4>Percent Achieved: {percentAchieved.toFixed(2)}%</h4>
        </>
    );
};
