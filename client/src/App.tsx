import React from 'react';
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
            </Routes>
        </div>
    );
}

export default App;
