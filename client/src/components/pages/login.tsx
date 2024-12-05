import React, {useState, useEffect} from "react";
import "../../css/login.css";
import {checkCorrectPassword} from "../utils/encryption";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {getUserHash} from "../utils/user-utils";
import {Link} from "react-router-dom";
import {setLoggedIn} from "../utils/user-cred";

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [wrongPw, openWrongPwBox] = React.useState(false);
    const [loggedIn, openLoggedInBox] = React.useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let hash = getUserHash(username);

        if (checkCorrectPassword(password, await hash)) {
            console.log("Login Successful");
            setLoggedIn(username, await hash);
            openLoggedInBox(true);
        } else {
            console.log("Login Failed");
            openWrongPwBox(true);
        }
    };

    const handleWrongPwBoxClose = () => {
        openWrongPwBox(false);
    };

    const handleLoggedInBoxClose = () => {
        openLoggedInBox(false);
    };

    useEffect(() => {
        document.title = "Login to Sleep Buddies";
    }, []);

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form className="login-form">
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text"
                           id="username"
                           name="username"
                           value={username}
                           placeholder="Enter your username"
                           className="input-field"
                           onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password"
                           id="password"
                           name="password"
                           value={password}
                           placeholder="Enter your password"
                           className="input-field"
                           onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button" onClick={handleSubmit}>Log In</button>
            </form>

            <Dialog className="wrongpw-dialog"
                    open={wrongPw}
                    onClose={handleWrongPwBoxClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Invalid credentials"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Incorrect username or password.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWrongPwBoxClose}>Try again</Button>
                </DialogActions>
            </Dialog>

            <Dialog className="loggedin-dialog"
                    open={loggedIn}
                    onClose={handleLoggedInBoxClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Login Successful"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are now logged in.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/home">
                        <Button onClick={handleLoggedInBoxClose}>Go to Home</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginPage;
