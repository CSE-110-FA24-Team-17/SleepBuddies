import React, {useState} from "react";

const Alarm = () => {
    const [alarmTime, setAlarmTime] = useState("");
    const [savedAlarmTime, setSavedAlarmTime] = useState("");

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAlarmTime(event.target.value);
    };

    const handleSave = () => {
        setSavedAlarmTime(alarmTime);
    };

    return (
        <>
            <h1>Alarm</h1>

            <div className="alarm-setting">
                <label htmlFor="alarmTime">Set Alarm:</label>
                <input
                    type="time"
                    id="customTime"
                    value={alarmTime}
                    onChange={handleTimeChange}
                    placeholder="Enter custom time"
                />

                <button onClick={handleSave}>Save Alarm Time</button>
            </div>

            {savedAlarmTime && (
                <div className="saved-alarm">
                    <p>Saved Alarm Time: {savedAlarmTime}</p>
                </div>
            )}
        </>
    );
};

export default Alarm;
