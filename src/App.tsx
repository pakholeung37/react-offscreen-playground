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
      <Activity mode={mode}>
        <ABB countFormParent={count} />
      </Activity>
    </div>
  );
}

export default App;

function ABB(props: { countFormParent: number }) {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    console.log("mount ABB");
    return () => {
      console.log("unmount ABB");
    };
  }, []);

  React.useMemo(() => {
    console.log("memo ABB");
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  const add = React.useCallback(() => {
    setCount((count) => count + 1);
  }, []);
  return (
    <div>
      <h2>I'am In Activity</h2>
      <div>counter from Parent{props.countFormParent}</div>
      <button onClick={add}>add</button>
      <div>counter inner{count}</div>
    </div>
  );
}
