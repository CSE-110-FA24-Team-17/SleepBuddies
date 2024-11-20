import React from "react";
import {Link} from "react-router-dom";

const Signup = () => {
    return (
        <Link className="clickable" to="/signup">
            <div className="applet">
                <p className="button-text">Sign Up</p>
            </div>
        </Link>
    );
};

export default Signup;
