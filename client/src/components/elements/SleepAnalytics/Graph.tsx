//import { title } from "process";
import React, {useState} from "react";
import { Chart } from "react-google-charts";
// https://www.react-google-charts.com/docs/quick-walkthrough

export const Graph: React.FC<{ hoursSlept: number[] }> = ({ hoursSlept }) =>{
    const [goal, setGoal] = useState<number>(6);

    const sleepData = [
        ["Day", "Hours", { role: "style" }],
        ["Sun", hoursSlept[0], hoursSlept[0] > goal ? "#2DA84E" : "#E52B2B"],
        ["Mon", hoursSlept[1], hoursSlept[1] > goal ? "#2DA84E" : "#E52B2B"],
        ["Tue", hoursSlept[2], hoursSlept[2] > goal ? "#2DA84E" : "#E52B2B"],
        ["Wed", hoursSlept[3], hoursSlept[3] > goal ? "#2DA84E" : "#E52B2B"],
        ["Thurs", hoursSlept[4], hoursSlept[4] > goal ? "#2DA84E" : "#E52B2B"],
        ["Fri", hoursSlept[5], hoursSlept[5] > goal ? "#2DA84E" : "#E52B2B"],
        ["Sat", hoursSlept[6], hoursSlept[6] > goal ? "#2DA84E" : "#E52B2B"],
    ];

    const options = {
        title: "Sleep Trends in a 1 Week Period",
        hAxis: {title: "Days"},
        vAxis: {title: "Hours"},
        backgroundColor: "white",
    };

    return (
        <>
            <h2>Sleep Throughout the Week</h2>
            <Chart
                chartType="ColumnChart"
                data={sleepData}
                options={options}
            />
            
            <label htmlFor="sleepGoal">Set your Sleep Goal (hours): </label>
                <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                    min={1}
                    max={24}
            />
        </>
    );
};