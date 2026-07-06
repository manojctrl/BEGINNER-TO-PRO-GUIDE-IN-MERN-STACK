import React, { useEffect } from 'react'

const Cleanup = () => {
    const [count, setCount] = React.useState(0);
    useEffect(()=>{
      const timer =  setInterval(()=>{
            setCount(count + 1)
        },1000)

        return ()=> {
            clearInterval(timer)
        }
    }, [])
  return (
    <div>
        <h1>Count: {count}</h1>
        {/* <button onClick={() => setCount(count + 1)}>Increase</button> */}
      
    </div>
  )
}

export default Cleanup
