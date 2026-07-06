import React from 'react'

const UseRef = () => {
    const inputRef = React.useRef(1);
    const handleFocus = () => {
        // inputRef.current.focus();
        // console.log(inputRef.current.value);
        // inputRef.current.focus();
        console.log(inputRef)
    }
  return (
    <div>
      <h1>UseRef hooks</h1>
      <input ref={inputRef} value="Manoj Katuwal" type="text" placeholder="Enter your name" />
      <button onClick={handleFocus}>Focus</button>
    </div>
  )
}

export default UseRef
