import { PropTypes } from 'prop-types';

import TaskItem from '../taskItem/taskItem';

import './taskList.css';

function TaskList({ todoData, onDelete, onToggleDone, startTimer, pauseTimer }) {
  const elements = todoData.map((item) => {
    const { id, ...props } = item;
    return (
      <TaskItem
        key={id}
        {...props}
        onDelete={() => onDelete(id)}
        onToggleDone={() => onToggleDone(id)}
        startTimer={() => startTimer(id)}
        pauseTimer={() => pauseTimer(id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  onDelete: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
