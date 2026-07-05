import React, { useEffect } from "react";

const App = () => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    console.log("Run");
  },[count]);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default App;
