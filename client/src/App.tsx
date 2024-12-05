import React, {useState} from 'react';
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
import Journal from "./components/pages/journal";
import {logout} from "./components/utils/user-cred";

const App = () => {
    const location = useLocation(); // Get the current route
    // Check if the navbar should be displayed
    const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

    const [showHelp, setShowHelp] = useState(false);

    function handleLogout() {
        logout();
        alert("You have been logged out");
    }

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
                            <li className="menu-item">
                                <Link to="/journal">Journal</Link>
                            </li>
                        </ul>

                        <ul>
                            <button className="help-button" onClick={() => setShowHelp(true)}>Help</button>
                            <Link to="/">
                                <button className="logout-button" onClick={handleLogout}>Log Out</button>
                            </Link>
                        </ul>
                    </nav>
                </header>
            )}

            {showHelp && (
                <div className="help-modal">
                    <div className="help-content">
                        <button className="close-button" onClick={() => setShowHelp(false)}>X</button>
                        <h2>Navigation Help</h2>
                        <ul>
                            <li><strong>Home:</strong> Go back to the main page.</li>
                            <li><strong>Sleep:</strong> Track your sleep and get reports.</li>
                            <li><strong>Meditation:</strong> Access guided meditation exercises.</li>
                            <li><strong>Alarm:</strong> Set and manage your alarms.</li>
                            <li><strong>Music:</strong> Play calming music for relaxation.</li>
                            <li><strong>Journal:</strong> Record your thoughts, track your sleep patterns, and reflect
                                on your day.
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <main>
                <Routes>
                    <Route path="/" Component={Welcome}/>
                    <Route path="/login" Component={Login}/>
                    <Route path="/signup" Component={Signup}/>
                    <Route path="/home" Component={Home}/>
                    <Route path="/sleep" Component={Sleep}/>
                    <Route path="/meditation" Component={Meditation}/>
                    <Route path="/alarm" Component={Alarm}/>
                    <Route path="/music" Component={Music}/>
                    <Route path="/journal" Component={Journal}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;
