type Log = {
    date: Date;
    hours: number;
}

export const addHours = async (log: Log): Promise<Log> => {
    const response = await fetch(`http://localhost:8080/sleepLogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(log),
    });

    if (!response.ok){
        throw new Error("Failed to add");
    }

    return response.json();
};

export const fetchHours = async (): Promise<Log[]> => {
    const response = await fetch(`http://localhost:8080/sleepLogs`);

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