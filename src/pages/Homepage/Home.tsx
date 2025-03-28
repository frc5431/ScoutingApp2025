import React, { useEffect, useState } from "react";
import './Home.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TuneIcon from '@mui/icons-material/Tune';
import PatchNotes from "./PatchNotes";
import { versions } from "./PatchNotes";
import Config from "./Config";
import '@fontsource/luckiest-guy';

interface Homeprops {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

const Homepage: React.FC<Homeprops> = ({ setPage }) => {
    const [homepageVisible, enableHomepageVisible] = useState(true);
    const [patchNotes, enablePatchNotes] = useState(false);
    const [config, enableConfig] = useState(false);

    return (
        <div>
            {homepageVisible && <>
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
                    <p>Version: {versions[0].name}</p>
                </div>
            </>}

            {!config &&
                <div className="patchnotes">
                    <button className="patchbutton" onClick={() => { enablePatchNotes((prev) => !prev); enableHomepageVisible((prev) => !prev) }}>
                        <span style={{ marginRight: '1vw' }}>Patch Notes</span>
                        <AssignmentIcon fontSize="large" />
                    </button>
                </div>
            }

            {!patchNotes &&
                <button className="configbutton" onClick={() => { enableConfig((prev) => !prev); enableHomepageVisible((prev) => !prev) }}>
                    <span style={{ marginRight: '1vw' }}>Config</span>
                    <TuneIcon fontSize="large" />
                </button>
            }

            {
                patchNotes && <>
                    <PatchNotes />
                </>
            }

            {
                config && <>
                    <Config />
                </>
            }

        </div>
    );
};

export default Homepage;
