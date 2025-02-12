import React, { useEffect, useState } from "react";
import Counter from '../../components/Counter/Counter';
import RadioButtons, { Option } from "../../components/radioButtons/radioButtons";
import './Match.css';

export interface matchProps {
  matchData: { [key: string]: any };
  setMatchData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const Match: React.FC<matchProps> = ({ matchData, setMatchData }: matchProps) => {
  const [l1Scored, setl1Scored] = useState(matchData.l1Scored || 0);
  const [l2Scored, setl2Scored] = useState(matchData.l2Scored || 0);
  const [l3Scored, setl3Scored] = useState(matchData.l3Scored || 0);
  const [l4Scored, setl4Scored] = useState(matchData.l4Scored || 0);
  const [coralMissed, setCoralMissed] = useState(matchData.coralMissed || 0);
  const [netScoredHuman, setNetScoredHuman] = useState(matchData.netScoredHuman || 0);
  const [netMissHuman, setNetMissHuman] = useState(matchData.netMissHuman || 0);
  const [netScoredBot, setNetScoredBot] = useState(matchData.netScoredBot || 0);
  const [netMissBot, setNetMissBot] = useState(matchData.netMissBot || 0);
  const [processorScored, setProcessorScored] = useState(matchData.processorScored || 0);

  
  useEffect(() => {
    setMatchData(oldData => ({ ...oldData, l2Scored, l3Scored, l1Scored, l4Scored, coralMissed, netScoredHuman, netMissHuman, netScoredBot, netMissBot, processorScored}))
    // console.log('stage', stage, 'coopertiiton', coopertition, 'spotlight', spotlight)
  }, [l2Scored, l3Scored, l1Scored, l4Scored, coralMissed, netScoredHuman, netMissHuman, netScoredBot, netMissBot, processorScored])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission
    // You can add any additional logic here if needed\
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>

        <li>
          <div className="matchrow">
            <Counter
              name='L1'
              count={l1Scored}
              onButtonUp={() => { if (l1Scored < 99) setl1Scored(l1Scored + 1) }}
              onButtonDown={() => { if (l1Scored > 0) setl1Scored(l1Scored - 1) }}
            />
            <Counter
              name='L2'
              count={l2Scored}
              onButtonUp={() => { if (l2Scored < 99) setl2Scored(l2Scored + 1) }}
              onButtonDown={() => { if (l2Scored > 0) setl2Scored(l2Scored - 1) }}
            />
            </div>
            <div className="matchrow">
            <Counter
              name='L3'
              count={l3Scored}
              onButtonUp={() => { if (l3Scored < 99) setl3Scored(l3Scored + 1) }}
              onButtonDown={() => { if (l3Scored > 0) setl3Scored(l3Scored - 1) }}
            />
            <Counter
              name='L4'
              count={l4Scored}
              onButtonUp={() => { if (l4Scored < 99) setl4Scored(l4Scored + 1) }}
              onButtonDown={() => { if (l4Scored > 0) setl4Scored(l4Scored - 1) }}
            />
          </div>
          <div className="matchrow">
            <Counter
              name='Net Scored(🗿)'
              count={netScoredHuman}
              onButtonUp={() => { if (netScoredHuman < 99) setNetScoredHuman(netScoredHuman + 1) }}
              onButtonDown={() => { if (netScoredHuman > 0) setNetScoredHuman(netScoredHuman - 1) }}
            />
            <Counter
              name='Net Miss(🗿)'
              count={netMissHuman}
              onButtonUp={() => { if (netMissHuman < 99) setNetMissHuman(netMissHuman + 1) }}
              onButtonDown={() => { if (netMissHuman > 0) setNetMissHuman(netMissHuman - 1) }}
            />
          </div>
          <div className="matchrow">
            <Counter
              name='Net Scored(🤖)'
              count={netScoredBot}
              onButtonUp={() => { if (netScoredBot < 99) setNetScoredBot(netScoredBot + 1) }}
              onButtonDown={() => { if (netScoredBot > 0) setNetScoredBot(netScoredBot - 1) }}
            />
            <Counter
              name='Net Miss(🤖)'
              count={netMissBot}
              onButtonUp={() => { if (netMissBot < 99) setNetMissBot(netMissBot + 1) }}
              onButtonDown={() => { if (netMissBot > 0) setNetMissBot(netMissBot - 1) }}
            />
          </div>
          <div className="matchrow">
            <Counter
              name='Coral Missed'
              count={coralMissed}
              onButtonUp={() => { if (coralMissed < 99) setCoralMissed(coralMissed + 1) }}
              onButtonDown={() => { if (coralMissed > 0) setCoralMissed(coralMissed - 1) }}
            />
            <Counter
              name='Processor'
              count={processorScored}
              onButtonUp={() => { if (processorScored < 99) setProcessorScored(processorScored + 1) }}
              onButtonDown={() => { if (processorScored > 0) setProcessorScored(processorScored - 1) }}
            />  
          </div>  

        </li>
      </ul>
    </form>
  );
};

export default Match;