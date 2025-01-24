
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
        <button onClick={onButtonUp} className="leftbutton">↑</button>
        <h2 className="counterdisplay">{count}</h2>
        <button onClick={onButtonDown} className="rightbutton">↓</button>
        </div>
        </div>
    </>
  )
}

export default Counter;