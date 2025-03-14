import React, { useEffect, useState } from "react";
import ImageClick from "../../components/ImageClick";
import RadioButtons, { Option } from "../../components/radioButtons/radioButtons";
import Field from "../../components/Field/Field";
import './Mainpage.css';
import { triggerConfetti } from "../../components/triggerConfetti";
import Algae from "../../assets/algae.png";
import Coral from "../../assets/coral.png";

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
        <ul>
        <div className="input-row">
          <div className="fake-input-container">
            <h3 style={{fontSize: "1.3em", paddingRight:'2vw'}}>Alliance:</h3>
            <div className="alliance-buttons">
          <button className={alliance === Alliance.RED ? 'redAllianceButtonColor' : 'defaultAllianceButtonColor'} onClick={()=>{setAlliance(Alliance.RED);triggerConfetti('basic', 'red')}}>
            Red</button>
            </div>
            <div className="alliance-buttons">
          <button className={alliance === Alliance.BLUE ? 'blueAllianceButtonColor' : 'defaultAllianceButtonColor'} onClick={()=>{setAlliance(Alliance.BLUE);triggerConfetti('basic','blue')}}>
            Blue</button>
            </div>
          </div>
          <li>
            <Field type="text" value={compDay} setValue={setCompDay} groupName="Comp Day" placeHolder="Ex: Plano"></Field>
          </li>
        </div>

          <div className="input-row">

          <li>
            <Field type="text" value={scouterName} setValue={setScouterName} groupName="Scouter Name" placeHolder="Ex: Rudy"></Field>
          </li>
          <li>
            <Field type="number" value={matchID} setValue={setMatchID} groupName="Match ID" min={0} max={99} placeHolder="Ex: 5"></Field>
          </li>
          </div>
          <div className="input-row">
          <li>
            <Field type="number" value={teamID} setValue={setTeamID} groupName="Team ID" min={0} max={20000} placeHolder="Ex: 5431"></Field>
          </li>
          

        
          <li className="fake-input-container">
          <div className="checkboxContainer">
            <label className="mainpage-checkbox">
            <input type="checkbox" checked={preload} onChange={e => setPreload(e.target.checked)}/>
            <span className="checkmark"></span>
            <span className="checkboxtext">Pre load</span>
            </label>
            <label className="mainpage-checkbox">
            <input type="checkbox" checked={noshow} onChange={e => setNoshow(e.target.checked)}/>
            <span className="checkmark"></span>
            <span className="checkboxtext">No Show</span>
            </label>
            </div>
          </li>
          </div>

          <li>
            {/* <label style={{fontSize:'1.5em'}}>Robot Starting Position (Click The Button to Select)</label>
            <ImageClick type={"one"} robotPos={robotPos} setRobotPos={()=>null}></ImageClick> */}
            <RadioButtons vari={robotPos} setVari={setRobotPos} options={robotPosOptions} groupName="Robot Starting Position"></RadioButtons>
          </li>
     </ul>
      </form>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', marginTop:'4vh'}}>
        <div className="gamepiece-container">
        <img src={Algae} style={{width:'20vw'}}/>
        <p style={{color:'#A6E9CD'}}>Algae</p>
        </div>
        <div className="gamepiece-container">
        <img src={Coral} style={{width:'20vw'}}/>
        <p>Coral</p>
        </div>
      </div>
    </>
  );
};

enum Alliance {
  BLUE="BLUE",
  RED="RED",
  NOT_SET="NOT_SET"
}

export default Mainpage;
