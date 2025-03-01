import React, { useState } from "react";
import './Home.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PatchNotes from "./PatchNotes";

interface Homeprops {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const Homepage: React.FC<Homeprops> = ({ setPage }) => {
    const [patchNotes, enablePatchNotes] = useState(false);

    return (
        <div>
            {!patchNotes && <>
                <div className="h1">
                    <h1 className="title">
                        <span>5</span>
                        <span>4</span>
                        <span>3</span>
                        <span>1</span>
                    </h1>
                </div>
                <div className="container">
                    <div className="bubbles">
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                        <div className="bubble"></div>
                    </div>
                    <div className="ripple"></div>
                    <h2 className="h2">DEEP DIVE</h2>

                    <div className="water-overlay"></div>
                </div>
                <button className="scoutingButton"
                    onClick={() => { setPage("Mainpage"); }}>Start Scouting!</button>
                <div className="versionNumber">
                    <p>Version: HOPEFULLY_DONE_16.1v</p>
                </div>
            </>}
            <div className="patchnotes">
                <button className="patchbutton" onClick={() => enablePatchNotes((prev) => !prev)}>
                    <span style={{ marginRight: '1vw' }}>Patch Notes</span>
                    <AssignmentIcon fontSize="large" />
                </button>
            </div>

            {patchNotes && <>
            <PatchNotes/>
            </>}
        </div>
    );
};

export default Homepage;
