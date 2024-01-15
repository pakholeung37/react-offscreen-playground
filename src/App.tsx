import * as React from "react";
import { useState } from "react";
import "./App.css";

console.log(React.unstable_Activity);
const Activity = React.unstable_Activity;
function App() {
  const [mode, setMode] = useState("visible");
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          add
        </button>
        <div>counter {count}</div>
      </div>
      <button
        onClick={() => {
          setMode((mode) => (mode === "visible" ? "hidden" : "visible"));
        }}
      >
        toggle
      </button>
      <div style={{ display: 'flex ', gap: 40 }}>
        <Activity mode={mode}>
          <Inner countFormParent={count} from={'activity'} />
        </Activity>
        <div style={{ display: mode === 'visible' ? 'block' : 'none' }}>
          <Inner countFormParent={count} from={'display'} />
        </div>
      </div>
    </div>
  );
}

export default App;

function Inner(props: { countFormParent: number, from: 'activity' | 'display' }) {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    console.log("mount Inner from " + props.from);
    return () => {
      console.log("unmount Inner from " + props.from);
    };
  }, []);

  React.useMemo(() => {
    console.log("memo Inner from " + props.from);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  },[]);

  const add = React.useCallback(() => {
    console.log("callback Inner from " + props.from);
    setCount((count) => count + 1);
  }, []);
  return (
    <div>
      <h2>I'am In {props.from}</h2>
      <div>counter from Parent{props.countFormParent}</div>
      <button onClick={add}>add</button>
      <div>counter inner{count}</div>
    </div>
  );
}
