import React from "react";
import "../../css/login.css";

const LoginPage = () => {
    return (
        <div className="login-page">
            <h1>Login</h1>
            <form className="login-form">
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" placeholder="Enter your username" className="input-field" />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" className="input-field" />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;
