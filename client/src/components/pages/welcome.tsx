import React, {useEffect} from "react";
import Home from "../elements/Home";
import Login from "../elements/Login";
import Signup from "../elements/Signup";
import "../../css/welcome.css";
import {getLoggedIn} from "../utils/user-cred";

const Welcome = () => {

    useEffect(() => {
        document.title = "Sleep Buddies";
    }, []);

    if (getLoggedIn()) {
        return (
            <>
                <div className="welcome-header">
                    <h1>Sleep Buddies 🌠</h1>
                    <h6>Welcome back!</h6>
                </div>
                <div className="welcome_page-div">
                    <Home/>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="welcome-header">
                    <h1>Sleep Buddies 🌠</h1>
                </div>
                <div className="welcome_page-div">
                    <Login/>
                    <Signup/>
                </div>
            </>
        );
    }
};

export default Welcome;
