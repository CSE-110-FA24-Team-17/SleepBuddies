import React from "react";

import '../../css/Sleep.css';

import {SleepLog} from "../elements/SleepAnalytics/SleepLog";
import {Chart} from "../elements/SleepAnalytics/Chart";
import {Statistics} from "../elements/SleepAnalytics/Statistics";

const Sleep = () => {
    return (
        <>
            <h1>Sleep Analytics</h1>
            <div className="Comps">
                <div className="item"><SleepLog/></div>
                <div className="item"><Chart/></div>
                <div className="item"><Statistics/></div>
            </div>
        </>
    );
};

export default Sleep;
