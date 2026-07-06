import { useState, useRef } from "react";
// import "./App.css";

function StopWatch() {
  // UI ma dekhine time
  const [seconds, setSeconds] = useState(0);

  // Timer ID store garna
  const timerRef = useRef(null);

  // Start button
  function startTimer() {
    // Already running xa vane feri start nagarne
    if (timerRef.current !== null) {
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  // Stop button
  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  // Reset button
  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(0);
  }

  return (
    <div className="container">
      <h1>Stopwatch</h1>

      <h2>{seconds} sec</h2>

      <button onClick={startTimer}>Start</button>

      <button onClick={stopTimer}>Stop</button>

      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default StopWatch;