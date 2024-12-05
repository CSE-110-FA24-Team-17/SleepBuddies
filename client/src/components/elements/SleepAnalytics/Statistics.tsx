import React, { useState } from "react";
import { addHours } from "../../utils/sleep-utils";

export const Statistics: React.FC<{ updateSleepData: (newHoursSlept: number[]) => void }> = ({ updateSleepData }) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Store sleep and wake times as strings (in 24-hour format)
    const [sleepTimes, setSleepTimes] = useState<string[]>(Array(7).fill(''));
    const [wakeTimes, setWakeTimes] = useState<string[]>(Array(7).fill(''));
    const [hoursSlept, setHoursSlept] = useState<number[]>(Array(7).fill(0));
    const [averageSleep, setAverageSleep] = useState<number>(0);
    const [weekDates, setWeekDates] = useState<string[]>(Array(7).fill(''));

    const timeToDecimal = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours + minutes / 60;
    };

    const calculateSleepDuration = (sleepTime: string, wakeTime: string) => {
        const sleepDecimal = timeToDecimal(sleepTime);
        let wakeDecimal = timeToDecimal(wakeTime);

        // If the wake time is earlier than sleep time (meaning the wake time is the next day)
        if (wakeDecimal < sleepDecimal) {
            wakeDecimal += 24; // Add 24 hours to the wake time
        }

        return wakeDecimal - sleepDecimal;
    };

    const handleTimeChange = (index: number, sleepTime: string, wakeTime: string) => {
        const newSleepTimes = [...sleepTimes];
        const newWakeTimes = [...wakeTimes];
        newSleepTimes[index] = sleepTime;
        newWakeTimes[index] = wakeTime;

        const newHoursSlept = [...hoursSlept];
        if (sleepTime && wakeTime) {
            newHoursSlept[index] = calculateSleepDuration(sleepTime, wakeTime);

            const dateObj = new Date(weekDates[index]).toISOString();
            // const logs = await fetchHours();
            // const logExists = logs.find((log: Log) => log.date === dateObj);
            
            // add to json
            const entry = {
                date: dateObj,
                hours: newHoursSlept[index],
            }

            addHours(entry);

            // if (logExists){
            //     await updateHours(entry);
            // } else {
            //     await addHours(entry);
            // }
        } else {
            newHoursSlept[index] = 0; // No data, set hours slept to 0
        }

        const validDays = newHoursSlept.filter(hours => hours > 0); // Only count days with non-zero hours
        const totalSleep = validDays.reduce((acc, hours) => acc + hours, 0);

        setSleepTimes(newSleepTimes);
        setWakeTimes(newWakeTimes);
        setHoursSlept(newHoursSlept);
        setAverageSleep(validDays.length > 0 ? totalSleep / validDays.length : 0); // Calculate average only for valid days

        updateSleepData(newHoursSlept);  // Pass updated data to parent component
    };

    // Use useEffect to calculate the dates for the current week
    React.useEffect(() => {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay); // Go back to the Sunday of the current week

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date.toLocaleDateString());
        }
        setWeekDates(dates);
    }, []);

    return (
        <>
            <h2>Sleeping Log</h2>
            <h3>Enter Sleep Time and Wake Up Time for Each Day:</h3>
            <div className="weekLog">
                {daysOfWeek.map((day, index) => (
                    <div key={index}>
                        <label>{day} ({weekDates[index]}):</label>
                        <input
                            className="smallInput"
                            data-testid={"start" + day}
                            type="time"
                            value={sleepTimes[index]}
                            onChange={(e) => handleTimeChange(index, e.target.value, wakeTimes[index])}
                        />
                        <span> to </span>
                        <input
                            className="smallInput"
                            data-testid={"end" + day}
                            type="time"
                            value={wakeTimes[index]}
                            onChange={(e) => handleTimeChange(index, sleepTimes[index], e.target.value)}
                        />
                        <span> : {hoursSlept[index] > 0 ? hoursSlept[index].toFixed(2) : ""} {"Hrs"}</span>
                    </div>
                ))}
            </div>
            <h3 data-testid="averageH">Average Hours Slept this Week: {averageSleep.toFixed(2)}</h3>
        </>
    );
};
