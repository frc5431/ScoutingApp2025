import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Notes from "../components/Notes";
import RadioButtons, { Option } from "../components/radioButtons/radioButtons";
import { triggerConfetti } from "../components/triggerConfetti";
import pickupduck from "../assets/pickupduck.jpg";
import Field from "../components/Field/Field";

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
    setCompDayPerm(mainpageData.compDay);

    setMainpageData({compDay : compDayPerm});
    setMatchData({});
    setAutonData({});
    setEndData({});

    setPage("Mainpage")
    triggerConfetti('burst', '5431')
    triggerConfetti('cannon', '5431')
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
              <div className="inputcolorredpointscool">
                <Field type="number" value={redPoints} setValue={setRedPoints} groupName="Red Points" min={0} max={999} placeHolder="Ex: 68"></Field>
              </div>
            </li>
            <li>
              <div className="input-container">
                <div className="inputcolorbluepointscool">
                  <Field type="number" value={bluePoints} setValue={setBluePoints} groupName="Blue Points" min={0} max={999} placeHolder="Ex: 70"></Field>
                </div>
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
        notes !== "" ? (
          <div className="popup-overlay">
            <div className="popup-container">
              <QRCode value={JSON.stringify(allData)} />
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
