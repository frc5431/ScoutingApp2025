import React from "react";
import './Home.css';

interface Homeprops {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const Homepage: React.FC<Homeprops> = ({setPage}) => {
    return (
        <div>
            <h1 className="title">
                <span>5</span>
                <span>4</span>
                <span>3</span>
                <span>1</span>
            </h1>
            <h2 style={{color:'lightBlue'}}>Deep Dive</h2>
            <button className="scoutingButton"
            onClick={() => {setPage("Mainpage");}}>Start Scouting!</button>
            <div className="patchnotes">
                <button>patch notes</button>
            </div>
        </div>
    );
};

export default Homepage;
