import React, { useEffect, useState } from "react";
import ImageClick from "../components/ImageClick";
import RadioButtons, { Option } from "../components/radioButtons/radioButtons";

export interface mainpageProps {
  mainpageData: {[key:string]: any};
  setMainpageData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>;
}

const Mainpage: React.FC<mainpageProps> = ({mainpageData, setMainpageData}: mainpageProps) => {
  const [matchID, setMatchID] = useState(mainpageData.matchID || '');
  const [compDay, setCompDay] = useState<string>(mainpageData.compDay || '');
  const [scouterName, setScouterName] = useState(mainpageData.scouterName || '');
  const [alliance, setAlliance] = useState(mainpageData.alliance || Alliance.NOT_SET);
  const [teamID, setTeamID] = useState(mainpageData.teamID || '');
  const [preload, setPreload] = useState(mainpageData.preload || false);
  const [noshow, setNoshow] = useState(mainpageData.noshow || false);
  const [robotPos, setRobotPos] = useState(mainpageData.robotPos || '');
  
  const robotPosOptions: Option = [
    { label: 'Close', value: 'Close' },
    { label: 'Middle', value: 'Middle' },
    { label: 'Far', value: 'Far' }
  ];

  useEffect(() => {
    setMainpageData(oldData => ({...oldData, alliance, matchID, compDay, scouterName, teamID, robotPos, preload, noshow}))
  }, [alliance, matchID, compDay, scouterName, teamID, robotPos, preload, noshow])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission
    // You can add any additional logic here if needed
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <div className="select-dropdown">
        <label>Alliance: </label>
        <select name="alliance" id="alliance" value={alliance} onChange={(event) => setAlliance(event.target.value as Alliance)}>
          <option value={Alliance.NOT_SET} disabled>Select an alliance</option>
          <option value={Alliance.RED}>Red Alliance</option>
          <option value={Alliance.BLUE}>Blue Alliance</option>
        </select>
        </div> */}

        <ul>

        <div className="input-row-mainpage">
          <div className="fake-input-container">
            <h3 style={{fontSize: "1.3em", paddingRight:'2vw'}}>Alliance:</h3>
          <button className="alliance-buttons" onClick={()=>setAlliance(Alliance.RED)} style={{backgroundColor:alliance === Alliance.RED ? '#ff283a' : '#4e4e4e'}}>
            Red</button>
          <button className="alliance-buttons" onClick={()=>setAlliance(Alliance.BLUE)} style={{backgroundColor:alliance === Alliance.BLUE ? '#007bff' : '#4e4e4e'}}>
            Blue</button>
          </div>
          <li>
            <div className="input-container">
            <label>Comp Day</label>
            <input name="Comp Day" value={compDay}  onChange={e => setCompDay(e.target.value)}/>
            </div>
            </li>
        </div>

          <div className="input-row-mainpage">

          <li>
            <div className="input-container">
            <label>Scouter Name</label>
            <input name="Scouter Name" value={scouterName} onChange={e => setScouterName(e.target.value)}/>
            </div>
          </li>
          <li>
            <div className="input-container">
            <label>Match Number</label>
            <input name="Match ID" value={matchID} type="number" onChange={e => setMatchID(e.target.value)}/>
            </div>
          </li>
          </div>
          

          <div className="input-row-mainpage">
          <li>
          <div className="input-container">
            <label>Team Number</label>
            <input id="teamID" name="TeamID" value={teamID} type="number" onChange={e => setTeamID(e.target.value)}/>
            </div>
          </li>
          

        
          <li className="fake-input-container">
          <div className="checkboxContainer">
            <label className="custom-checkbox">
            <input type="checkbox" checked={preload} onChange={e => setPreload(e.target.checked)}/>
            <span className="checkmark"></span>
            <span className="checkboxtext">Pre load </span>
            </label>
            <label className="custom-checkbox">
            <input type="checkbox" checked={noshow} onChange={e => setNoshow(e.target.checked)}/>
            <span className="checkmark"></span>
            <span className="checkboxtext">No Show </span>
            </label>
            </div>
          </li>
          </div>

          <li>
            {/* <label style={{fontSize:'1.5em'}}>Robot Starting Position (Click to show)</label>
            <ImageClick type={"one"} robotPos={robotPos} setRobotPos={setRobotPos}></ImageClick> */}
            <RadioButtons vari={robotPos} setVari={setRobotPos} options={robotPosOptions} groupName="Robot Starting Position"></RadioButtons>
          </li>
     </ul>
      </form>
    </>
  );
};

enum Alliance {
  BLUE="BLUE",
  RED="RED",
  NOT_SET="NOT_SET"
}

export default Mainpage;
