import React, { useEffect, useState } from "react";
import Counter from '../components/Counter';
import RadioButtons, { Option } from "../components/radioButtons/radioButtons";

export interface matchProps {
  matchData: {[key: string]: any};
  setMatchData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>;
}

const Match: React.FC<matchProps> = ({matchData, setMatchData}: matchProps) => {
  const [l1Scored, setl1Scored] = useState(matchData.l1Scored || 0);
  const [l2Scored, setl2Scored] = useState(matchData.l2Scored || 0);
  const [l3Scored, setl3Scored] = useState(matchData.l3Scored || 0);
  const [l4Scored, setl4Scored] = useState(matchData.l4Scored || 0);
  const [netScoredHuman, setNetScoredHuman] = useState(matchData.netScoredHuman || 0);
  const [netMissHuman, setNetMissHuman] = useState(matchData.netMissHuman || 0);
  const [netScoredBot, setNetScoredBot] = useState(matchData.netScoredBot || 0);
  const [netMissBot, setNetMissBot] = useState(matchData.netMissBot || 0);
  const [processorScored, setProcessorScored] = useState(matchData.processorScored || 0);

  const [spotlight, setSpotlight] = useState(matchData.spotlight || '');
  const spotlightOptions: Option = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];
  const [stage, setStage] = useState(matchData.stage || '');
  const stageOptions: Option = [
    { label: 'Deep Climb', value: 'DeepClimb' },
    { label: 'Shallow Climb', value: 'ShallowClimb' },
    { label: 'Park', value: 'Park' },
    { label: 'None', value: 'None'}
  ];
  const [coopertition, setCoopertition] = useState(matchData.coopertition || '');
  const coopertitionOptions: Option = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  useEffect(() => {
    setMatchData(oldData => ({...oldData, l2Scored, l3Scored, l1Scored, l4Scored, netScoredHuman, netMissHuman, netScoredBot, netMissBot, processorScored, spotlight, stage, coopertition}))
    // console.log('stage', stage, 'coopertiiton', coopertition, 'spotlight', spotlight)
  }, [l2Scored, l3Scored, l1Scored, l4Scored, netScoredHuman, netMissHuman, netScoredBot, netMissBot, processorScored, spotlight, stage, coopertition])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission
    // You can add any additional logic here if needed\
  };

  return (
      <form onSubmit={handleSubmit}>
        <ul>
          
          <li>
            <div className="matchrow1">
            <Counter
              name='L1'
              count={l1Scored}
              onButtonUp={() => setl1Scored(l1Scored+1)}
              onButtonDown={() => {if (l1Scored > 0) setl1Scored(l1Scored-1)}}
            />
            <Counter
              name='L2'
              count={l2Scored}
              onButtonUp={() => setl2Scored(l2Scored+1)}
              onButtonDown={() => {if (l2Scored > 0) setl2Scored(l2Scored-1)}}
            />
            <Counter
              name='L3'
              count={l3Scored}
              onButtonUp={() => setl3Scored(l3Scored+1)}
              onButtonDown={() => {if (l3Scored > 0) setl3Scored(l3Scored-1)}}
            />
            <Counter
              name='L4'
              count={l4Scored}
              onButtonUp={() => setl4Scored(l4Scored+1)}
              onButtonDown={() => {if (l4Scored > 0) setl4Scored(l4Scored-1)}}
            />
            </div>
            <div className="matchrow2">
            <Counter
              name='Net Scored(🗿)'
              count={netScoredHuman}
              onButtonUp={() => setNetScoredHuman(netScoredHuman+1)}
              onButtonDown={() => {if (netScoredHuman > 0) setNetScoredHuman(netScoredHuman-1)}}
            />
            <Counter
              name='Net Miss(🗿)'
              count={netMissHuman}
              onButtonUp={() => setNetMissHuman(netMissHuman+1)}
              onButtonDown={() => {if (netMissHuman > 0) setNetMissHuman(netMissHuman-1)}}
            />
            <Counter
              name='Net Scored(🤖)'
              count={netScoredBot}
              onButtonUp={() => setNetScoredBot(netScoredBot+1)}
              onButtonDown={() => {if (netScoredBot > 0) setNetScoredBot(netScoredBot-1)}}
            />
            
            </div>
            <div className="matchrow3">
            <Counter
              name='Net Miss(🤖)'
              count={netMissBot}
              onButtonUp={() => setNetMissBot(netMissBot+1)}
              onButtonDown={() => {if (netMissBot > 0) setNetMissBot(netMissBot-1)}}
            />
            <Counter
              name='Processor'
              count={processorScored}
              onButtonUp={() => setProcessorScored(processorScored+1)}
              onButtonDown={() => {if (processorScored > 0) setProcessorScored(processorScored-1)}}
            />
            </div>
            <div className="matchrow3">
              
              <RadioButtons vari={stage} setVari={setStage} options={stageOptions} groupName="Endgame"></RadioButtons>
              
            </div>

          </li>
        </ul>
      </form>
  );
};

export default Match;


{/* <form> */}
              {/* <p className="mngrtghfwevbcfs"><strong>Spotlight</strong></p>
              <label className="radio"> 
              <input type = "radio" id="yes" name="leftstartingzone"></input>
              <span>Yes</span>
              </label>
              <label className="radio"> 
              <input type = "radio" id="yes" name="leftstartingzone"></input>
              <span>No</span>
              </label>
            </form>
            <form>
              <p className="mngrtghfwevbcfs"><strong>Stage</strong></p>
              <label className="radio"> 
              <input type = "radio" id="yes" name="leftstartingzone"></input>
              <span>Park</span>
              </label>
              <label className="radio"> 
              <input type = "radio" id="yes" name="leftstartingzone"></input>
              <span>Onstage</span>
              </label>
              <label className="radio"> 
              <input type = "radio" id="yes" name="leftstartingzone"></input>
              <span>None</span>
              </label>
            </form>
            <form>
              <p className="mngrtghfwevbcfs"><strong>Coopertition</strong></p>
              <label className="radio"> 
              <input type = "radio" id="yes" name="leftstartingzone"></input>
              <span>Yes</span>
              </label>
              <label className="radio"> 
              <input type = "radio" id="yes" name="leftstartingzone"></input>
              <span>No</span>
              </label>
            </form> */}