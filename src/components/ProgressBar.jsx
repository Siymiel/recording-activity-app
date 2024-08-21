import React from 'react';

const ProgressBar = ({ progress, timeRemaining }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <span className="time-remaining">{timeRemaining} left</span>
    </div>
  );
};

export default ProgressBar;
