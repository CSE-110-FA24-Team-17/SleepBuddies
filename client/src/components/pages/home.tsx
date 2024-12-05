import React, { useEffect, useState } from "react";
import "../../css/home.css";
import MorningSB from "../../assets/MorningSB.png";
import AfternoonSB from "../../assets/AfternoonSB.png"
import NightSB from "../../assets/NightSB.png"
import {getUsername} from "../utils/user-cred";

const Home = () => {

    const [user, setUser] = useState("");
    const [greeting, setGreeting] = useState("");
    const [image, setImage] = useState("");
    const [dailyQuote, setDailyQuote] = useState("");

    useEffect(() => {
        document.title = "Sleep Buddies - Home";

        if (getUsername() === "Guest") {
            setUser("Buddy");
        } else {
            setUser(getUsername());
        }

        const hour = new Date().getHours(); //get the current hour (0-23) from user local
        if (hour < 12) {
            setGreeting("Good morning");
            setImage(MorningSB); // morning image (implement if i have time)
        } else if (hour < 14) {
            setGreeting("Good afternoon");
            setImage(AfternoonSB);
        } else if (hour < 21) {
            setGreeting("Good evening");
            setImage(AfternoonSB);
        } else {
            setGreeting("Good night");
            setImage(NightSB);
        }

        const quotes = [
            "Keep going, you've got this!",
            "Every day is a fresh start.",
            "Believe in yourself!",
            "Rest and recharge, you're doing great!",
            "Success is near!",
            "You are capable of amazing things.",
        ];

        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0); // start of the year
        // calculate the day of the year (1-365 or 366)
        const dayOfYear = Math.floor( // the 1000 turns millisecs to secs, then secs to mins, then to hrs, then to days
            (today.getTime() - startOfYear.getTime()) / 1000 / 60 / 60 / 24
        );
        const quoteIndex = dayOfYear % quotes.length; // cycle through quotes
        setDailyQuote(quotes[quoteIndex]);

    }, []);

    //const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <>
            <main className="home-content">
                <div className="greeting-container">
                    <h2 className="greeting">{greeting}, {user}!</h2>
                    <p className="motivational-quote">{dailyQuote}</p>
                </div>
                <div className="sleep-buddy-container">
                    <img
                        src={image}
                        alt="Sleep Buddy"
                        className="sleep-buddy-image"
                    />
                </div>
            </main>

        </>
    );
};

export default Home;
