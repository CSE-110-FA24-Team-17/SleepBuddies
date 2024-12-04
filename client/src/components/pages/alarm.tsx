import React, { useState, useEffect, useRef } from "react";
import "../../css/alarm.css";
import AlarmModal from "../elements/AlarmModal";
import AlarmRingingModal from "../elements/AlarmRingingModal";

// Define the type for an alarm
type AlarmType = {
  title: string;
  time: string;
  description: string;
  frequency: string[]; // Days of the week, e.g., ["Mon", "Wed"]
  sound: boolean;
  active: boolean;
  hasRung?: boolean; // Tracks if the alarm has already rung
};

const Alarm = () => {
  const [alarms, setAlarms] = useState<AlarmType[]>([
    {
      title: "Medication Alarm",
      time: "08:00 PM",
      description: "Take evening medication",
      frequency: ["Mon", "Wed", "Fri"],
      sound: true,
      active: true,
      hasRung: false,
    },
    {
      title: "Brush Teeth Alarm",
      time: "09:00 PM",
      description: "Reminder to brush your teeth before bed",
      frequency: ["Tue", "Thu"],
      sound: true,
      active: true,
      hasRung: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newAlarm, setNewAlarm] = useState<AlarmType>({
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

  // Monitor alarms and play the ringing alarm
  useEffect(() => {
    const checkAlarms = () => {
      const current = new Date();
      const currentDay = current.toLocaleString("en-US", { weekday: "short" });
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
              a === alarm ? { ...a, hasRung: true } : a
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

    // Calculate the time until midnight
    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    // Set a timeout to reset alarms at midnight
    const midnightTimeout = setTimeout(() => {
      resetAlarms();
      setInterval(resetAlarms, 24 * 60 * 60 * 1000); // Repeat daily
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout); // Cleanup on unmount
  }, []);

  const handleDeleteAlarm = (alarmToDelete: AlarmType) => {
    setAlarms((prevAlarms) =>
      prevAlarms.filter((alarm) => alarm !== alarmToDelete)
    );
  };

  const handleSnoozeAlarm = () => {
    if (ringingAlarm) {
      const snoozeTime = new Date();
      snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);

      const snoozedAlarm: AlarmType = {
        ...ringingAlarm,
        time: snoozeTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        hasRung: false, // Reset hasRung for the snoozed alarm
      };

      // Delete the current ringing alarm
      handleDeleteAlarm(ringingAlarm);

      // Add the snoozed alarm
      setAlarms((prevAlarms) => sortAlarmsByTime([...prevAlarms, snoozedAlarm]));
    }

    handleStopAlarm();
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
        setAlarms((prevAlarms) =>
          prevAlarms.filter((alarm) => alarm !== ringingAlarm)
        );
      }
    }

    setRingingAlarm(null);
  };
  

  const handleAddAlarmClick = () => {
    setEditIndex(null);
    setNewAlarm({
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
      i === index ? { ...alarm, active: !alarm.active } : alarm
    );
    setAlarms(sortAlarmsByTime(updatedAlarms));
  };

  return (
    <div className="alarm-page">
      {/* Audio element for alarm sound */}
      <audio ref={alarmSoundRef} src="/daybreak_iphone_alarm.mp3" />

      {/* Header */}
      <div className="alarm-header">
        <h1 className="alarm-page-title">Alarms</h1>
        <button className="add-alarm-button" onClick={handleAddAlarmClick}>
          +
        </button>
      </div>

      {/* Alarm List */}
      <div className="alarm-list">
        {alarms.map((alarm, index) => (
          <div
            key={index}
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
                onClick={() => handleDeleteAlarm(alarm)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alarm Modal */}
      {isModalOpen && (
        <AlarmModal
          newAlarm={newAlarm}
          setNewAlarm={setNewAlarm}
          handleSaveAlarm={handleSaveAlarm}
          handleCloseModal={() => setIsModalOpen(false)}
          handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewAlarm({ ...newAlarm, [e.target.name]: e.target.value })
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
        <AlarmRingingModal
          ringingAlarm={ringingAlarm}
          handleStopAlarm={handleStopAlarm}
          handleSnoozeAlarm={handleSnoozeAlarm}
        />
      )}
    </div>
  );
};

export default Alarm;
