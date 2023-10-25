import { formatDistanceToNow } from 'date-fns';

import './taskItem.css';

function TaskItem(props) {
  const { label, onDelete, onToggleDone, done, created, checked } = props;
  let classNames;

  if (done) {
    classNames = 'completed';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={checked} onChange={onToggleDone} />

        <label>
          <span className="description" onClick={onToggleDone}>
            {label}
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
