import React, {useState} from 'react';
import "./css/applet.css"
import "./css/App.css";
import "./css/home.css"

import {Route, Routes} from "react-router-dom";
import Login from "./components/pages/login";
import signup from "./components/pages/signup";
import Home from "./components/pages/home";
import Sleep from "./components/pages/sleep";
import Meditation from "./components/pages/meditation";
import Alarm from "./components/pages/alarm";
import Welcome from './components/pages/welcome';
import Music from "./components/pages/music";
import Journal from "./components/pages/journal";

// TODO For later
// export let sessionLoggedIn = false;
// export let user = "guest";
//
// export function setLoggedIn(username: string) {
//     sessionLoggedIn = true;
//     user = username;
// }

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Sleep Buddies 🌠</h1>
            </header>
            <Routes>
                <Route path="/" Component={Welcome}/>
                <Route path="/login" Component={Login}/>
                <Route path="/signup" Component={signup}/>
                <Route path="/home" Component={Home}/>
                <Route path="/sleep" Component={Sleep}/>
                <Route path="/meditation" Component={Meditation}/>
                <Route path="/alarm" Component={Alarm}/>
                <Route path="/music" Component={Music}/>
                <Route path="/journal" Component={Journal}/>
            </Routes>
        </div>
    );
}

export default App;
