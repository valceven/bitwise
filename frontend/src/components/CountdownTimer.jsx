import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return {
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const { minutes, seconds } = formatTime(secondsLeft);

  return (
    <span className="countdown font-mono text-2xl">
      <span style={{ "--value": "00" }} aria-live="polite">00</span>:
      <span style={{ "--value": minutes }} aria-live="polite">{minutes}</span>:
      <span style={{ "--value": seconds }} aria-live="polite">{seconds}</span>
    </span>
  );
};

export default CountdownTimer;
