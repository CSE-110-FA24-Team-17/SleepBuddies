import React from 'react';
import "./css/applet.css"
import "./css/App.css";
import "./css/home.css"

import {Route, Routes, Link, useLocation} from "react-router-dom";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Home from "./components/pages/home";
import Sleep from "./components/pages/sleep";
import Meditation from "./components/pages/meditation";
import Alarm from "./components/pages/alarm";
import Welcome from './components/pages/welcome';
import Music from "./components/pages/music";

const App = () => {
    const location = useLocation(); // Get the current route
    // Check if the navbar should be displayed
    const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);


    return (
        <div className="App">
            {/* Navigation Bar */}
            {!hideNavbar && (
                <header className="navbar">
                    <nav className="menu">
                        <ul className="menu-list">
                            <li className="menu-item">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/sleep">Sleep</Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/meditation">Meditation</Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/alarm">Alarm</Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/music">Music</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            )}

            <main>
                <Routes>
                    <Route path="/" Component={Welcome} />
                    <Route path="/login" Component={Login} />
                    <Route path="/signup" Component={Signup} />
                    <Route path="/home" Component={Home} />
                    <Route path="/sleep" Component={Sleep} />
                    <Route path="/meditation" Component={Meditation} />
                    <Route path="/alarm" Component={Alarm} />
                    <Route path="/music" Component={Music} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
