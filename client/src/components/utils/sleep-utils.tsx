import { API_BASE_URL } from "../constants/constants";
import {type Log} from "../elements/SleepAnalytics/types";

export const addHours = async (log: Log): Promise<Log> => {
    const response = await fetch(API_BASE_URL + "/sleepLogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(log),
    });

    if (!response.ok){
        throw new Error("Failed to add hours");
    }

    return response.json();
};

export const fetchHours = async (): Promise<Log[]> => {
    const response = await fetch(API_BASE_URL + "/sleepLogs");

    if (!response.ok){
        throw new Error("Failed to fetch");
    }

    const logList = response.json().then((jsonResponse) => {
        console.log("data in fetchHours", jsonResponse);
        return jsonResponse.data;
    });

    console.log("response in fetchHours", logList);

    return logList;
}

export const updateHours = async (log: Log): Promise<Log> => {
    if (!log.date) {
        throw new Error("no date given");
    }

    const formattedDate = new Date(log.date).toISOString();

    console.log("Updating hours for date:", formattedDate);

    const response = await fetch(API_BASE_URL + "/sleepLogs", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({hours: log.hours}),
    });

    if (!response.ok) {
        // throw new Error("Failed to update hours: " + log.date);
        const errorDetails = await response.text();
        throw new Error(`Failed to update hours for ${log.date}: ${response.status} - ${errorDetails}`);
    }

    return response.json();
};