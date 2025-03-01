import React, { useEffect, useState, version } from "react";
import './Home.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Version {
    name: string;
    notes: string[];
}

const PatchNotes: React.FC = () => {

    const [versionSelection, changeVersionSelection] = useState(0);
    const versions: Version[] = [
        {
            name: "HOPEFULLY_DONE_16.1v",
            notes: ["Moved back to home page button"]
        },
        {
            name: "HOPEFULLY_DONE_16v",
            notes: ["Added Homepage", "Added Patch Notes", "Fixed End Data not saving"]
        },
        {
            name: "HOPEFULLY_DONE_15.3v",
            notes: ["Fixed 'stage'", "Merged Revamp into Revamp???"]
        }
    ];

    useEffect(() => {
        if (versionSelection < 0) {
            changeVersionSelection(0);
        } else if (versionSelection >= versions.length) {
            changeVersionSelection(versions.length - 1);
        }
    }, [versionSelection, versions.length]);

    return (
        <>
            <div className="verisonSelector">
                <button
                    onClick={() => changeVersionSelection(versionSelection == versions.length - 1 ? versionSelection : versionSelection + 1)}
                    style={{ backgroundColor: 'transparent', color: 'red' }}>
                    <KeyboardArrowDownIcon fontSize="large" />
                </button>
                <h2>Version Selector</h2>
                <button 
                    onClick={() => changeVersionSelection(versionSelection == 0 ? 0 : versionSelection - 1)}
                    style={{ backgroundColor: 'transparent', color: 'green' }}>
                    <KeyboardArrowUpIcon fontSize="large" />
                </button>
            </div>
            <h2>{versions[versionSelection].name}</h2>
            <ul>
                {versions[versionSelection].notes.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </>
    );

}

export default PatchNotes