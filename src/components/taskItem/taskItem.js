import { formatDistanceToNow } from 'date-fns';

import './taskItem.css';

function TaskItem(props) {
  const { label, onDelete, onToggleDone, done, created, checked, time, startTimer, pauseTimer } = props;
  let classNames = done ? 'completed' : '';

  const getPadTime = (time) => time.toString().padStart(2, '0');

  const min = getPadTime(Math.floor(time / 60));
  const sec = getPadTime(time - min * 60);

  const timer = () => {
    if (time)
      return (
        <>
          <div className="timer-button">
            <button className="icon-play" type="button" aria-label="play" onClick={startTimer} />
            <button className="icon-pause" type="button" aria-label="pause" onClick={pauseTimer} />
          </div>
          <div className="timer">{`${min}:${sec}`}</div>
        </>
      );
    if (!time) return <span className="time-over">Time over</span>;
    return null;
  };

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={checked} onChange={onToggleDone} />

        <label>
          <span className="description">{label}</span>
          <span className="timer-block">{timer()}</span>
          <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
    </li>
  );
}

export default TaskItem;
