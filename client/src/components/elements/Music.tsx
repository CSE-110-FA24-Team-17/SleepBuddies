import Image from "../../assets/music.svg";
import {Link} from "react-router-dom";

const Music = () => {
    return (
        <Link className="clickable" to="/music">
            <div className="applet">
                <img className="image" src={Image} alt={"Music icon"}/>
                <div className="overlay">
                    <div className="overlayText">Music</div>
                </div>
            </div>
        </Link>
    );
};

export default Music;