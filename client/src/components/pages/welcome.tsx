import React from "react";
import Login from "../elements/Login";
import Signup from "../elements/Signup";
import "../../css/welcome.css";

const welcome = () => {
    return (
        <>
            <h1>Welcome to Sleep Buddies</h1>
            <div className="welcome_page-div">
                <Login/>
                <Signup/>
            </div>
        </>
    );
};

export default welcome;
