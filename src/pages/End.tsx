import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Notes from "../components/Notes";
import RadioButtons, { Option } from "../components/radioButtons/radioButtons";
import { triggerConfetti } from "../components/triggerConfetti";

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
  const [notes, setNotes] = useState(endData.notes || "");
  const [redPoints, setRedPoints] = useState(endData.redPoints || '');
  const [bluePoints, setBluePoints] = useState(endData.bluePoints || '');
  const [penalties, setPenalties] = useState(endData.penalties || '');
  const [RP, setRP] = useState(endData.RP || '');
  const [deactivated, setDeactivated] = useState(endData.deactivated || "");

  const deactivatedOptions: Option = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  const [playedDefense, setPlayedDefense] = useState(endData.playedDefense || "");
  const playedDefenseOptions: Option = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  const [submitted, setSubmitted] = useState(false);
  const [clearedConfirmed, setClearedConfirmed] = useState(false);

  const [allData, setAllData] = useState<{ [key: string]: any }>();
  useEffect(() => {
    setEndData((oldData) => ({ ...oldData, notes, redPoints, bluePoints, penalties, RP, playedDefense, deactivated }));
  }, [notes, redPoints, bluePoints, penalties, RP, playedDefense, deactivated]);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAllData({ ...mainpageData, ...autonData, ...autonData, ...endData, ...matchData, });
    console.log({ ...mainpageData, ...autonData, ...autonData, ...endData, ...matchData, });
    setSubmitted(true);
  };

  const resetValues = () => {
    setMainpageData({})
    setMatchData({})
    setAutonData({})
    setEndData({})
    
    setPage("Mainpage")
    triggerConfetti('burst')
    triggerConfetti('cannon')
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
        
        <Notes notes={notes} setNotes={setNotes}></Notes>
        <ul>
          <div className="input-row">
            <li>
              <div className="input-container">
                <div className="inputcolorredpointscool">
                    <label>Red Points</label>
                    <input name="Red Points" value={redPoints} onChange={(e) => setRedPoints(e.target.value)} type={"number"} />
                </div>
              </div>
            </li>
            <li>
              <div className="input-container">
                <div className="inputcolorbluepointscool">
                    <label>Blue Points</label>
                    <input name="Blue Points" value={bluePoints} onChange={(e) => setBluePoints(e.target.value)} type={"number"} />
                </div>
              </div>
            </li>
          </div>
          <div className="input-row">
            <li>
              <div className="input-container">
                  <label>Penalties</label>
                  <input name="Penalties" value={penalties} onChange={(e) => setPenalties(e.target.value)} type={"number"} />
              </div>
            </li>
            <li>
              <div className="input-container">
                    <label>RP</label>
                    <input name="RP" value={RP} onChange={(e) => setRP(e.target.value)} type={"number"} />
              </div>
            </li>
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
        <div>
           <button onClick={handleSubmit} className="submitButton">SUBMIT!</button>
        </div>
        <div>
          <button onClick={() => (setClearedConfirmed(true))} className="clearButton">CLEAR</button>
        </div>
      </form>

      {submitted && (
        <div className="popup-overlay">
          <div className="popup-container">
            <QRCode value={JSON.stringify(allData)} />
            <button className="exit-button" onClick={() => {hidePopup("QRCODE")}}>EXIT</button>
          </div>
        </div>
      )}

      {
        clearedConfirmed && (
        <div className="popup-overlay">
          <div style={{flexDirection:"column"}}>
            <h3>Are you sure you want to <strong style={{color:'red'}}>clear</strong>?</h3>
          <div className="popup-container" style={{flexDirection: "row", justifyContent:'space-between'}}>
            <button style={{margin:'1vw', backgroundColor:'green', fontSize:'2em'}} onClick={resetValues}>Yes</button>
            <button style={{margin:'1vw', backgroundColor:'red', fontSize:'2em'}} onClick={() => {hidePopup("CLEAR")}}>No</button>
        </div>
</div>
        </div>
        )
      }
    </>
  );
};

export default End;
