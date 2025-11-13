import React, { useState, useEffect, useCallback } from "react";

const StartButton = React.memo(({ onStart }) => {
  console.log("StartButton rendered");
  return <button onClick={onStart}>Start</button>;
});

const StopButton = React.memo(({ onStop }) => {
  console.log("StopButton rendered");
  return <button onClick={onStop}>Stop</button>;
});

export default function TimerApp() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const stopTimer = useCallback(() => setIsRunning(false), []);

  console.log("TimerApp rendered");

  return (
    <div>
      <h2>Timer: {seconds}s</h2>
      <StartButton onStart={startTimer} />
      <StopButton onStop={stopTimer} />
    </div>
  );
}
