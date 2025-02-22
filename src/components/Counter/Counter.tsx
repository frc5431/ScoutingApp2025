import './Counter.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Props {
  name: string;
  count: number;
  onButtonUp: () => void;
  onButtonDown: () => void;
}

function Counter({ name, count, onButtonDown, onButtonUp, }: Props) {

  return (
    <>
    <div className="countercontainer">
      <h2 className="countertitle">{name}</h2>
      <div className="counterinrow">
        <button onClick={onButtonDown} className="leftbutton"><KeyboardArrowDownIcon/></button>
        <h2 className="counterdisplay">{count}</h2>
        <button onClick={onButtonUp} className="rightbutton"><KeyboardArrowUpIcon/></button>
        </div>
        </div>
    </>
  )
}

export default Counter;