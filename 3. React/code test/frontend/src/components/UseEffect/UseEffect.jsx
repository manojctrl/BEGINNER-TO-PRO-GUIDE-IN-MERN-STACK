import React from 'react'

const UseEffect = () => {
  // 1. JavaScript logic goes HERE (above the return)
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    console.log("Run");
  }, [count]);
  
  // 2. The return statement only handles the HTML layout
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  )
}

export default UseEffect
