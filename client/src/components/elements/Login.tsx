import React from "react";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <Link className="clickable" to="/login">
            <div className="applet">
                <p className="button-text">Login</p>
            </div>
        </Link>
    );
};

export default Login;
