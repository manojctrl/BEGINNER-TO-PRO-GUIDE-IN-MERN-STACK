import React, { useEffect } from "react";

const UseState = () => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);   
//   }, []);
  return (
    <div>
      <h1>Count: {count}</h1>
      {/* <button onClick={() => setCount(count + 1)}>Increase</button>   */}
      {/* <button onClick={() => setCount(count + 1)}>Decrease</button>   */}
    </div>
  );
};

export default UseState;
