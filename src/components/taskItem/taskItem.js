import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './taskItem.css';

function TaskItem(props) {
  const { label, onDelete, onToggleDone, done, created, checked } = props;
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timerInterval;

    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timerRunning]);

  useEffect(() => {
    if (done) {
      handleTimerOff();
    }
  }, [done]);

  const handleTimerOn = () => {
    setTimerRunning(true);
  };
  const handleTimerOff = () => {
    setTimerRunning(false);
  };

  let classNames = done ? 'completed' : '';

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={checked} onChange={onToggleDone} />

        <label>
          <span className="description" onClick={onToggleDone}>
            {label}
          </span>
          <span className="timer">
            <button className="icon-play" onClick={handleTimerOn}></button>
            <button className="icon-pause" onClick={handleTimerOff}></button>
            {`${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}`}
          </span>
          <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
    </li>
  );
}

export default TaskItem;
