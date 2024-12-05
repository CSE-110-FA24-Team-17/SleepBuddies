import React, { useState, useEffect } from "react";

import '../../css/Sleep.css';

import { SleepLog, SleepLogs } from "../elements/SleepAnalytics/SleepLog";
import { Graph } from "../elements/SleepAnalytics/Graph";
import { Statistics } from "../elements/SleepAnalytics/Statistics";

import GoodJobImage from "../../assets/goodFeedback.png";
import BadJobImage from "../../assets/badFeedback.png";

const Sleep = () => {

    const [hoursSlept, setHoursSlept] = useState<number[]>(Array(7).fill(0));
    const [sleepGoal, setSleepGoal] = useState<number>(6); 

    const updateSleepData = (newHoursSlept: number[]) => {
        setHoursSlept(newHoursSlept);
    };

    // Calculate average sleep
    const validHours = hoursSlept.filter(hours => hours > 0); 
    const averageSleep = validHours.length > 0
        ? validHours.reduce((acc, curr) => acc + curr, 0) / validHours.length
        : 0;

    // Calculate best and worst days
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const maxSleepIndex = hoursSlept.indexOf(Math.max(...hoursSlept));
    const minSleepIndex = hoursSlept.indexOf(Math.min(...hoursSlept));

    const bestDay = {
        day: daysOfWeek[maxSleepIndex],
        hours: hoursSlept[maxSleepIndex],
    };

    const worstDay = {
        day: daysOfWeek[minSleepIndex],
        hours: hoursSlept[minSleepIndex],
    };

    useEffect(() => {
        document.title = "Sleep Buddies - Sleep Report";
    }, []);

    return (
        <>
            <h1>Sleep Analytics</h1>
            {averageSleep >= sleepGoal && averageSleep > 0 && (
                <div className="feedback">
                    <img
                        src={GoodJobImage}
                        alt="Good Job!"
                        style={{ width: "100px", marginTop: "20px" }}
                    />
                    <h2>Great work! You're exceeding your sleep goal!</h2>
                </div>
            )}

            {averageSleep < sleepGoal && averageSleep > 0 && (
                <div className="feedback">
                    <img
                        src={BadJobImage}
                        alt="Bad Job!"
                        style={{ width: "100px", marginTop: "20px" }}
                    />
                    <h2>Oh-no! Try sleeping more to hit your goal!</h2>
                </div>
            )}

            <div className="sleep-goal-container">
                <label htmlFor="sleep-goal">
                    <strong>Set Your Sleep Goal (hours): </strong>
                </label>
                <input
                    id="sleep-goal"
                    type="number"
                    value={sleepGoal}
                    min={0}
                    max={24}
                    onChange={(e) => setSleepGoal(Number(e.target.value))}
                />
            </div>
            
            <div className="Comps">
                <div className="item">
                    <SleepLog 
                        averageSleep={averageSleep} 
                        bestDay={bestDay}
                        worstDay={worstDay}
                        goal={sleepGoal}
                    />

                    {/* TO BE FINISHED ADDING */}
                    <SleepLogs/> 
                </div>
                <div className="item"><Graph hoursSlept={hoursSlept} goal={sleepGoal}/></div>
                <div className="item"><Statistics updateSleepData={updateSleepData}/></div> 
            </div>

        </>
    );
};

export default Sleep;
