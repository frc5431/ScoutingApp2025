import React, { useEffect, useState } from "react";
import ImageClick from "../components/ImageClick";
import Counter from '../components/Counter';
import RadioButtons, {Option} from "../components/radioButtons/radioButtons";

export interface autonProps {
  autonData: {[key: string]: any};
  setAutonData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>;
}

const Auton: React.FC<autonProps> = ({autonData, setAutonData}: autonProps) => {
  const [autonPath, setAutonPath] = useState<{ x: number; y: number }[]>(autonData.autonPath || []);
  const [autonDeAlgae, setAutonDeAlgae] = useState(autonData.autonDeAlgae || 0);
  const [autonAlgaeNet, setAutonAlgaeNet] = useState(autonData.autonAlgaeNet || 0);
  const [autonProcessor, setAutonProcessor] = useState(autonData.autonProcessor || 0);
  const [leftStart, setLeftStart] = useState<string>(autonData.leftStart || 'NOT_CHANGED');
  const [l1auton, setl1auton] = useState(autonData.l1 || 0);
  const [l2auton, setl2auton] = useState(autonData.l2 || 0);
  const [l3auton, setl3auton] = useState(autonData.l3 || 0);
  const [l4auton, setl4auton] = useState(autonData.l4 || 0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const leftStartOptions: Option = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  useEffect(() => {
    setAutonData(oldData => ({...oldData, autonPath, autonDeAlgae, autonAlgaeNet, autonProcessor, leftStart, l1auton, l2auton, l3auton, l4auton}))
  }, [autonPath , autonDeAlgae, autonAlgaeNet, autonProcessor, leftStart, l1auton, l2auton, l3auton, l4auton])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleResetPath = () => {
    setAutonPath([]);
    setResetTrigger(prev => prev + 1);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <div className="firsttwoautoncounters">
                
                <Counter
                  name='L1'
                  count={l1auton}
                  onButtonUp={() => {if (l1auton < 99) setl1auton(l1auton+1)}}
                  onButtonDown={() => {if (l1auton > 0) setl1auton(l1auton-1)}}
                />
                <Counter
                  name='L2'
                  count={l2auton}
                  onButtonUp={() => {if (l2auton < 99) setl2auton(l2auton+1)}}
                  onButtonDown={() => {if (l2auton > 0) setl1auton(l2auton-1)}}
                />
                <Counter
                  name='L3'
                  count={l3auton}
                  onButtonUp={() => {if (l3auton < 99) setl3auton(l3auton+1)}}
                  onButtonDown={() => {if (l3auton > 0) setl3auton(l3auton-1)}}
                />
                <Counter
                  name='L4'
                  count={l4auton}
                  onButtonUp={() => {if (l4auton < 99) setl4auton(l4auton+1)}}
                  onButtonDown={() => {if (l4auton > 0) setl4auton(l4auton-1)}}
                />
              </div>
              <div className="firsttwoautoncounters">
                <Counter
                  name='De-Algae'
                  count={autonDeAlgae}
                  onButtonUp={() => {if (autonDeAlgae < 99) setAutonDeAlgae(autonDeAlgae+1)}}
                  onButtonDown={() => {if (autonDeAlgae > 0) setAutonDeAlgae(autonDeAlgae-1)}}
                />
                <Counter
                  name='Algae Net'
                  count={autonAlgaeNet}
                  onButtonUp={() => {if (autonAlgaeNet < 99) setAutonAlgaeNet(autonAlgaeNet+1)}}
                  onButtonDown={() => {if (autonAlgaeNet > 0) setAutonAlgaeNet(autonAlgaeNet-1)}}
                />
                <Counter
                  name='Processor'
                  count={autonProcessor}
                  onButtonUp={() => {if (autonProcessor < 99) setAutonProcessor(autonProcessor+1)}}
                  onButtonDown={() => {if (autonProcessor > 0) setAutonProcessor(autonProcessor-1)}}
                />
              </div>
            </li>
            <li>
            <RadioButtons vari={leftStart} setVari={setLeftStart} options={leftStartOptions} groupName="Left Start" />
            </li>
            <div>
              <label style={{fontSize:'1.5em'}} >Robot Auton Path (Click to show path): </label>
              <button style={{fontSize:'1.5em'}} className="resetbutton" type="button" onClick={handleResetPath}>Reset Path</button>
              <ImageClick type="path" autonPath={autonPath} setAutonPath={setAutonPath} resetTrigger={resetTrigger} />
            </div>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Auton;