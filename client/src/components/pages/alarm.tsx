import React, {useState, useEffect, useRef} from "react";
import "../../css/alarm.css";
import {v4 as uuidv4} from "uuid"; // Importing uuid for unique IDs
import AlarmModal from "../elements/AlarmModal";
import AlarmRingingModal from "../elements/AlarmRingingModal";

// Define the type for an alarm
type AlarmType = {
    id: string; // Unique ID for each alarm
    title: string;
    time: string;
    description: string;
    frequency: string[]; // Days of the week, e.g., ["Mon", "Wed"]
    sound: boolean;
    active: boolean;
    hasRung?: boolean; // Tracks if the alarm has already rung
};

const Alarm = () => {
    const [alarms, setAlarms] = useState<AlarmType[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [newAlarm, setNewAlarm] = useState<AlarmType>({
        id: uuidv4(),
        title: "",
        description: "",
        time: "",
        sound: true,
        frequency: [],
        active: true,
        hasRung: false,
    });

    const [ringingAlarm, setRingingAlarm] = useState<AlarmType | null>(null);
    const alarmSoundRef = useRef<HTMLAudioElement | null>(null);

    // Helper function to convert time string to minutes since midnight
    const parseTimeToMinutes = (time: string): number => {
        const [hourMinute, period] = time.split(" ");
        const [hour, minute] = hourMinute.split(":").map(Number);
        const isPM = period === "PM";
        const adjustedHour = hour % 12 + (isPM ? 12 : 0);
        return adjustedHour * 60 + minute;
    };

    // Function to sort alarms by time
    const sortAlarmsByTime = (alarms: AlarmType[]) => {
        return [...alarms].sort(
            (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
        );
    };

    useEffect(() => {
        document.title = "Sleep Buddies - Alarms";
    }, []);

    // Monitor alarms and play the ringing alarm
    useEffect(() => {
        const checkAlarms = () => {
            const current = new Date();
            const currentDay = current.toLocaleString("en-US", {weekday: "short"});
            const currentMinutes = current.getHours() * 60 + current.getMinutes();

            alarms.forEach((alarm) => {
                if (
                    alarm.active &&
                    alarm.sound &&
                    !alarm.hasRung && // Check if it hasn't already rung
                    parseTimeToMinutes(alarm.time) === currentMinutes &&
                    (alarm.frequency.includes(currentDay) || alarm.frequency.length === 0)
                ) {
                    if (alarmSoundRef.current) {
                        alarmSoundRef.current.play();
                        alarmSoundRef.current.loop = true;
                    }
                    setRingingAlarm(alarm); // Set the ringing alarm
                    setAlarms((prevAlarms) =>
                        prevAlarms.map((a) =>
                            a.id === alarm.id ? {...a, hasRung: true} : a
                        )
                    ); // Mark alarm as rung
                }
            });
        };

        const interval = setInterval(checkAlarms, 1000);
        return () => clearInterval(interval);
    }, [alarms]);

    // Reset alarms at midnight to enable recurring alarms
    useEffect(() => {
        const resetAlarms = () => {
            setAlarms((prevAlarms) =>
                prevAlarms.map((alarm) => ({
                    ...alarm,
                    hasRung: false, // Reset hasRung for all alarms
                }))
            );
        };

        const now = new Date();
        const timeUntilMidnight =
            new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
            now.getTime();

        const midnightTimeout = setTimeout(() => {
            resetAlarms();
            setInterval(resetAlarms, 24 * 60 * 60 * 1000); // Repeat daily
        }, timeUntilMidnight);

        return () => clearTimeout(midnightTimeout);
    }, []);

    const handleDeleteAlarm = (alarmId: string) => {
        setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== alarmId));
    };

    const handleSnoozeAlarm = () => {
        if (ringingAlarm) {
            setAlarms((prevAlarms) =>
                prevAlarms.map((alarm) => {
                    if (alarm.id === ringingAlarm.id) {
                        if (alarmSoundRef.current) {
                            alarmSoundRef.current.pause();
                            alarmSoundRef.current.currentTime = 0;
                        }

                        const [hourMinute, period] = alarm.time.split(" ");
                        const [hours, minutes] = hourMinute.split(":").map(Number);

                        // Validate and handle potential parsing issues
                        if (isNaN(hours) || isNaN(minutes)) {
                            console.error("Invalid time format in alarm.");
                            return alarm; // Leave the alarm unchanged
                        }

                        // Convert to 24-hour format for calculations
                        let newHours = (hours % 12) + (period === "PM" ? 12 : 0);
                        let newMinutes = minutes + 5;

                        // Handle minute overflow past 59
                        if (newMinutes >= 60) {
                            newMinutes -= 60;
                            newHours += 1;
                        }

                        // Handle hour overflow past 23
                        if (newHours >= 24) {
                            newHours -= 24;
                        }

                        // Convert back to 12-hour format with AM/PM
                        const newTime = new Date(0, 0, 0, newHours, newMinutes).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        });

                        // Update the alarm's time and reset hasRung
                        return {...alarm, time: newTime, hasRung: false};
                    }
                    return alarm;
                })
            );

            // Clear the ringing alarm state
            setRingingAlarm(null);
        }
    };

    const handleStopAlarm = () => {
        if (alarmSoundRef.current) {
            alarmSoundRef.current.pause();
            alarmSoundRef.current.currentTime = 0;
        }

        if (ringingAlarm) {
            if (
                ringingAlarm.frequency.length === 0 ||
                ringingAlarm.frequency.includes("Just once")
            ) {
                handleDeleteAlarm(ringingAlarm.id);
            }
        }

        setRingingAlarm(null);
    };

    const handleAddAlarmClick = () => {
        setEditIndex(null);
        setNewAlarm({
            id: uuidv4(),
            title: "",
            description: "",
            time: "",
            sound: true,
            frequency: [],
            active: true,
            hasRung: false,
        });
        setIsModalOpen(true);
    };

    const handleSaveAlarm = () => {
        const updatedAlarm = {
            ...newAlarm,
            title: newAlarm.title.trim() || "Alarm",
        };

        let updatedAlarms;
        if (editIndex !== null) {
            updatedAlarms = alarms.map((alarm, index) =>
                index === editIndex ? updatedAlarm : alarm
            );
        } else {
            updatedAlarms = [...alarms, updatedAlarm];
        }

        setAlarms(sortAlarmsByTime(updatedAlarms));
        setIsModalOpen(false);
    };

    const handleToggleAlarm = (index: number) => {
        const updatedAlarms = alarms.map((alarm, i) =>
            i === index ? {...alarm, active: !alarm.active} : alarm
        );
        setAlarms(sortAlarmsByTime(updatedAlarms));
    };

    return (
        <div className="alarm-page">
            {/* Audio element for alarm sound */}
            <audio ref={alarmSoundRef} src="/daybreak_iphone_alarm.mp3"/>

            {/* Header */}
            <div className="alarm-header">
                <h1 className="alarm-page-title">Alarms</h1>
                <button className="add-alarm-button" onClick={handleAddAlarmClick}>
                    +
                </button>
            </div>

            {/* Alarm List */}
            <div className="alarm-list">
                {/* Show appropriate message based on whether alarms exist */}
                {alarms.length === 0 ? (
                    <div className="empty-alarm-message">
                        <p>No alarms set. Click + to add an alarm!</p>
                    </div>
                ) : (
                    <>
                        {/* Always show "Click + to add an alarm" when alarms exist */}
                        <div className="add-alarm-message">
                            <p>Click + to add an alarm</p>
                        </div>
                        {alarms.map((alarm, index) => (
                            <div
                                key={alarm.id}
                                className={`alarm-item ${alarm.active ? "" : "inactive"}`}
                            >
                                <div className="alarm-title-time-container">
                                    <div className="alarm-grid-title">
                                        <h2 className="alarm-title">{alarm.title}</h2>
                                    </div>
                                    <div className="alarm-grid-time">
                                        <strong className="alarm-time">{alarm.time}</strong>
                                    </div>
                                    <div className="alarm-grid-toggle">
                                        <label className="alarm-toggle">
                                            <input
                                                type="checkbox"
                                                checked={alarm.active}
                                                onChange={() => handleToggleAlarm(index)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="alarm-sound-frequency">
                  <span className="alarm-sound">
                    Sound: {alarm.sound ? "On" : "Off"}
                  </span>
                                    <p className="alarm-frequency">
                                        {alarm.frequency.join(", ") || "Just once"}
                                    </p>
                                </div>
                                <div className="alarm-description">
                                    <p className="description-title">
                                        Description: {alarm.description}
                                    </p>
                                </div>
                                <div className="alarm-actions">
                                    <button
                                        className="edit-alarm-button"
                                        onClick={() => {
                                            setEditIndex(index);
                                            setNewAlarm(alarms[index]);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-alarm-button"
                                        onClick={() => handleDeleteAlarm(alarm.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>


            {/* Alarm Modal */}
            {isModalOpen && (
                <AlarmModal
                    newAlarm={newAlarm}
                    setNewAlarm={setNewAlarm}
                    handleSaveAlarm={handleSaveAlarm}
                    handleCloseModal={() => setIsModalOpen(false)}
                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewAlarm({...newAlarm, [e.target.name]: e.target.value})
                    }
                    handleFrequencyChange={(day: string) =>
                        setNewAlarm((prevAlarm) => ({
                            ...prevAlarm,
                            frequency: prevAlarm.frequency.includes(day)
                                ? prevAlarm.frequency.filter((d) => d !== day)
                                : [...prevAlarm.frequency, day],
                        }))
                    }
                />
            )}

            {/* Ringing Alarm Modal */}
            {ringingAlarm && (
                <>
                    <div className="alarm-overlay"></div>
                    {/* Semi-transparent background */}
                    <AlarmRingingModal
                        ringingAlarm={ringingAlarm}
                        handleStopAlarm={handleStopAlarm}
                        handleSnoozeAlarm={handleSnoozeAlarm}
                    />
                </>
            )}

        </div>
    );
};

export default Alarm;
