import React, {useState, useEffect} from "react";
import "../../css/signup.css";
import {generateSaltedHash} from "../utils/encryption";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import {API_BASE_URL} from "../constants/constants";
import {Link} from "react-router-dom";
import {checkUsernameExists} from "../utils/user-utils";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const SignUpPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPw, setConfirmPw] = useState<string>('');

    const [usernameExists, openUsernameExistsBox] = React.useState(false);
    const [emptyField, openEmptyFieldBox] = React.useState(false);
    const [pwMatch, openPasswordMatchBox] = React.useState(false);
    const [accCreated, openAccCreatedBox] = React.useState(false);

    function refreshPage() {
        window.location.reload();
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmitInfo = async (username: string, submitPw: string): Promise<boolean> => {
        try {
            await axios.post(API_BASE_URL + "/users", {
                username,
                encryptedPw: submitPw,
            });
            console.log("User info submitted, account created.");
            return true;
        } catch (error) {
            console.error("Error creating account:", error);
            alert("Failed to create account. Please try again.");
            refreshPage();
            return false;
        }
    };

    const handleCredentials = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (await checkUsernameExists(username)) {
            console.error("Username already exists!");
            openUsernameExistsBox(true);
        } else if (username === '' || password === '') {
            console.error("Field cannot be empty");
            openEmptyFieldBox(true);
        } else if (password !== confirmPw) {
            console.error("Passwords don't match");
            openPasswordMatchBox(true);
        } else {
            let hash = generateSaltedHash(password);
            if (hash === '' || hash === null) {
                console.error("Hash gen error");
                throw Error("Hash is null");
            }
            console.log("Hash Generated");
            if (await handleSubmitInfo(username, hash)) {
                openAccCreatedBox(true);
            }
        }
    };

    const handleEmptyFieldClose = () => {
        openEmptyFieldBox(false);
        refreshPage();
    };

    const handlePwMatchClose = () => {
        openPasswordMatchBox(false);
        refreshPage();
    };

    const handleAccCreatedClose = () => {
        openAccCreatedBox(false);
    };

    const handleUsernameExistsClose = () => {
        openUsernameExistsBox(false);
        refreshPage();
    };

    useEffect(() => {
        document.title = "Sign Up for Sleep Buddies";
    }, []);

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            {/* Username*/}
            <form className="signup-form">
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="Enter your username"
                        className="input-field"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Enter your password"
                        className="input-field"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input type="password"
                           id="confirmPw"
                           value={confirmPw}
                           placeholder="Confirm your password"
                           className="input-field"
                           onChange={e => setConfirmPw(e.target.value)}
                    />
                </div>

                {/* Scrollable Terms and Services */}
                <div className="terms-container">
                    <label>Terms and Services:</label>
                    <textarea
                        className="terms-textbox"
                        readOnly
                        value={`Please read the following terms and services before signing up. 
                        [Your terms and conditions go here. Add as much text as needed to make this scrollable.]`}
                    />
                </div>

                {/* Checkbox for accepting terms */}
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="terms-checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms-checkbox">
                        I agree to the Terms and Services
                    </label>
                </div>

                <button
                    type="submit"
                    className="login-button"
                    disabled={!isChecked}
                    onClick={handleCredentials}
                >
                    Sign Up
                </button>
            </form>

            <Dialog className="username-exists-dialog"
                    open={usernameExists}
                    onClose={handleUsernameExistsClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Username Already Exists!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please try another username.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUsernameExistsClose}>Try again</Button>
                </DialogActions>
            </Dialog>

            <Dialog className="emptyfield-dialog"
                    open={emptyField}
                    onClose={handleEmptyFieldClose}
                    aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Field cannot be empty"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleEmptyFieldClose}>Try again</Button>
                </DialogActions>
            </Dialog>

            <Dialog className="pwmatch-dialog"
                    open={pwMatch}
                    onClose={handlePwMatchClose}
                    aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Passwords don't match"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handlePwMatchClose}>Try again</Button>
                </DialogActions>
            </Dialog>

            <Dialog className="acc-created-dialog"
                    open={accCreated}
                    onClose={handleAccCreatedClose}
                    aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Account Created"}
                </DialogTitle>
                <DialogActions>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SignUpPage;
