import React, { useState } from "react";
import '../../css/Sleep.css';

import { SleepLog } from "../elements/SleepAnalytics/SleepLog";
import { Graph } from "../elements/SleepAnalytics/Graph";
import { Statistics } from "../elements/SleepAnalytics/Statistics";

const Sleep = () => {
    const [hoursSlept, setHoursSlept] = useState<number[]>(Array(7).fill(0));

    const updateSleepData = (newHoursSlept: number[]) => {
        setHoursSlept(newHoursSlept);
    };

    return (
        <>
            <h1>Sleep Analytics</h1>
            <div className="Comps">
                <div className="item"><SleepLog/></div>
                <div className="item"><Graph hoursSlept={hoursSlept}/></div>
                <div className="item"><Statistics updateSleepData={updateSleepData}/></div> 
            </div>
            <h1>Previous Sleep Logs</h1>
        </>
    );
};

export default Sleep;
