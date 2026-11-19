import React from 'react'

const Countdown = ({ expiryDate, now }) => {
  if (expiryDate <= now) {
    return null;
  }

  const secondsLeft = Math.floor((expiryDate - now) / 1000);
  const minutesLeft = Math.floor(secondsLeft / 60);
  const hoursLeft = Math.floor(minutesLeft / 60);

  return (
    <div className="de_countdown">{hoursLeft}h {minutesLeft % 60}m {secondsLeft % 60}s</div>
  )
};

export default Countdown;