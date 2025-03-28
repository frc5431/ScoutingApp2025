import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Notes from "../../components/Notes/Notes";
import RadioButtons, { Option } from "../../components/radioButtons/radioButtons";
import { triggerConfetti } from "../../components/triggerConfetti";
import pickupduck from "../../assets/pickupduck.jpg";
import Field from "../../components/Field/Field";
import './End.css';
import { v4 as uuidv4 } from 'uuid';
import { useAtom } from "jotai";
import { swapAllianceAtom } from "../Homepage/Config";
export interface endProps {
  endData: { [key: string]: any };
  setEndData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  mainpageData: { [key: string]: any };
  setMainpageData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  autonData: { [key: string]: any };
  setAutonData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  matchData: { [key: string]: any };
  setMatchData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const End: React.FC<endProps> = ({
  endData,
  setEndData,
  mainpageData,
  setMainpageData,
  autonData,
  setAutonData,
  matchData,
  setMatchData,
  setPage
}: endProps) => {
  const [notes, setNotes] = useState<string>(endData.notes || "");
  const [redPoints, setRedPoints] = useState(endData.redPoints || '');
  const [bluePoints, setBluePoints] = useState(endData.bluePoints || '');
  const [penalties, setPenalties] = useState(endData.penalties || '');
  const [RP, setRP] = useState(endData.RP || '');
  const RP_MAX = 6; // Change this for different game rules
  const [deactivated, setDeactivated] = useState(endData.deactivated || "");
  const [playedDefense, setPlayedDefense] = useState(endData.playedDefense || "");

  const [compDayPerm, setCompDayPerm] = useState(mainpageData.compDay || "");
  const deactivatedOptions: Option = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  const playedDefenseOptions: Option = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  const [stage, setStage] = useState(endData.stage || '');
  const stageOptions: Option = [
    { label: 'Deep Climb', value: 'DeepClimb' },
    { label: 'Shallow Climb', value: 'ShallowClimb' },
    { label: 'Park', value: 'Park' },
    { label: 'None', value: 'None' }
  ];

  const [coopertiton, setCoopertiton] = useState(endData.coopertiton);
  const coopertitonOptions: Option = [
    { label: 'Yes', value: 'Cooporated' },
    { label: 'No', value: 'Not coopertition' },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [clearedConfirmed, setClearedConfirmed] = useState(false);

  const [allData, setAllData] = useState<{ [key: string]: any }>();
  useEffect(() => {
    setEndData((oldData) => ({ ...oldData, notes, redPoints, bluePoints, penalties, RP, playedDefense, deactivated, stage, coopertiton}));
  }, [notes, redPoints, bluePoints, penalties, RP, playedDefense, deactivated, stage, coopertiton]);

  const [UUID, setUUID] = useState(uuidv4().toString());
  const QRuuid =  UUID.toString();
  const [swapAlliance] = useAtom(swapAllianceAtom);

  

const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  setEndData({...endData, QRuuid})
  
    // First log each piece of data separately
    console.log('Raw data before merge:');
    console.log('mainpageData:', mainpageData);
    console.log('autonData:', autonData);
    console.log('matchData:', matchData);
    console.log('endData:', endData);
    console.log('QRuuid:', QRuuid);

    // Create the merged data
    
    const mergedData = { ...mainpageData, ...autonData, ...matchData, ...endData };
    
    // Log the actual string that will be encoded in QR
    console.log('QR Code String:', JSON.stringify(mergedData));
    
    setAllData(mergedData);
    setSubmitted(true);
};


  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const usedForQR = Math.min(vw, vh);

  const resetValues = () => {
    setCompDayPerm(mainpageData.compDay);

    setMainpageData({ compDay: compDayPerm });
    setMatchData({});
    setAutonData({});
    setEndData({});
    setUUID("")
    setPage("Mainpage");
    triggerConfetti('burst', '5431');
    triggerConfetti('cannon', '5431');
  }
  const hidePopup = (popup: string) => {
    switch (popup) {
      case "QRCODE":
        setSubmitted(false);
      case "CLEAR":
        setClearedConfirmed(false);
      default:
        console.log(popup + " NOT VALUE");
    }

  }


  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >

        <Notes notes={notes} setNotes={setNotes} placeholder="Do good notes or the SNS team will haunt you"></Notes>
        <ul>
          <div className="input-row">
            <li>
              <div className="input-container">
                <div>
                  {!swapAlliance && <Field type="number" value={redPoints} setValue={setRedPoints} groupName="Red Points" min={0} max={999} placeHolder="Ex: 70" style={{color:'#ffcccb'}}></Field>}
                  {swapAlliance && <Field type="number" value={bluePoints} setValue={setBluePoints} groupName="Blue Points" min={0} max={999} placeHolder="Ex: 68" style={{color:'#cde3fd'}}></Field>}
                </div>
              </div>
            </li>
            <li>
              <div>
                {!swapAlliance && <Field type="number" value={bluePoints} setValue={setBluePoints} groupName="Blue Points" min={0} max={999} placeHolder="Ex: 68" style={{color:'#cde3fd'}}></Field>}
                {swapAlliance && <Field type="number" value={redPoints} setValue={setRedPoints} groupName="Red Points" min={0} max={999} placeHolder="Ex: 70" style={{color:'#ffcccb'}}></Field>}
              </div>
            </li>
          </div>
          <div className="input-row">
            <li>
              <Field type="number" value={penalties} setValue={setPenalties} groupName="Penalties" min={0} max={999} placeHolder="Ex: 15"></Field>
            </li>
            <li>
              <Field type="number" value={RP} setValue={setRP} groupName="Ranking Points" min={0} max={RP_MAX} placeHolder="Ex: 2"></Field>
            </li>
          </div>
          <div>
            <div className="endrow">

              <RadioButtons vari={stage} setVari={setStage} options={stageOptions} groupName="Endgame"></RadioButtons>
              <RadioButtons vari={coopertiton} setVari={setCoopertiton} options={coopertitonOptions} groupName="Coopertition"></RadioButtons>
            </div>
          </div>
          <div className="omgsexyrow">
            <li>
              <RadioButtons vari={deactivated} setVari={setDeactivated} options={deactivatedOptions} groupName="Deactivated"></RadioButtons>
            </li>
            <li>
              <RadioButtons vari={playedDefense} setVari={setPlayedDefense} options={playedDefenseOptions} groupName="Played Defense"></RadioButtons>
            </li>
          </div>
        </ul>
        <div className="buttoncontainer ">
        
          <button onClick={handleSubmit} className="submitButton">SUBMIT!</button>
        
       
          <button onClick={() => (setClearedConfirmed(true))} className="clearButton">CLEAR</button>
      
        </div>
      </form>

      {submitted && (
        notes !== "" ? (
          <div className="popup-overlay">
            <div className="popup-container">
              <QRCode value={JSON.stringify(allData)} size={usedForQR - 150} />
              <button className="exit-button" onClick={() => { hidePopup("QRCODE") }}>EXIT</button>
            </div>
          </div>
        ) : (
          <div className="popup-overlay">
            <div className="popup-container" style={{ color: "black" }}>
              <h3>DO NOTES TO PICK UP A DUCK AND SUBMIT</h3>
              <img src={pickupduck} alt="Pick up a duck" />
              <button className="exit-button" onClick={() => { hidePopup("QRCODE") }}>EXIT</button>
            </div>
          </div>
        ))}
      {
        clearedConfirmed && (
          <div className="popup-overlay">
            <div style={{ flexDirection: "column" }}>
              <h3>Are you sure you want to <strong style={{ color: 'red' }}>clear</strong>?</h3>
              <div className="popup-container" style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <button style={{ margin: '1vw', backgroundColor: 'green', fontSize: '2em' }} onClick={resetValues}>Yes</button>
                <button style={{ margin: '1vw', backgroundColor: 'red', fontSize: '2em' }} onClick={() => { hidePopup("CLEAR") }}>No</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default End;