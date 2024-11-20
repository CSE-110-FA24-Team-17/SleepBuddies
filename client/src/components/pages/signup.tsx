import React, { useState } from "react";
import "../../css/signup.css";

const SignUpPage = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            {/* Username*/}
            <form className="signup-form">
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" placeholder="Enter your username" className="input-field" />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" className="input-field" />
                </div>
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input type="password" placeholder="Confirm your password" className="input-field" />
                </div>

                {/* Scrollable Terms and Services */}
                <div className="terms-container">
                    <label>Terms and Services:</label>
                    <textarea 
                        className="terms-textbox" 
                        readOnly 
                        value={`Please read the following terms and services before signing up. [Your terms and conditions go here. Add as much text as needed to make this scrollable.]`}
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

                <button type="submit" className="login-button" disabled={!isChecked}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
