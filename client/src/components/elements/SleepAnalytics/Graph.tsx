import React from "react";
import { Chart } from "react-google-charts";
// https://www.react-google-charts.com/docs/quick-walkthrough

export const Graph = () =>{
    const goal = 6;
    const hardCodeData = [
        ["Day", "Hours", {role: "style"}],
        ["Monday", 6, 6 > goal ? "#2DA84E": "#E52B2B"],
        ["Tuesday", 7, 7 > goal ? "#2DA84E": "#E52B2B"],
        ["Wednesday", 7.5, 7.5 > goal ? "#2DA84E": "#E52B2B"],
        ["Thursday", 6, 6 > goal ? "#2DA84E": "#E52B2B"],
        ["Friday", 9, 9 > goal ? "#2DA84E": "#E52B2B"],
        ["Saturday", 10, 10 > goal ? "#2DA84E": "#E52B2B"],
        ["Sunday", 8, 8 > goal ? "#2DA84E": "#E52B2B"],
    ];

    const options = {
        title: "Sleep Trends in a 1 Week Period",
        hAxis: {title: "Days"},
        vAxis: {title: "Hours"},
        backgroundColor: "white",
    };

    return (
        <>
            <h2>WIP</h2>
            <Chart
                chartType="ColumnChart"
                data={hardCodeData}
                options={options}
            />
        </>
    );
};