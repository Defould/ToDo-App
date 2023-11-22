import { useState } from 'react';

import './newTaskForm.css';

const NewTaskForm = (props) => {
  const [task, setTask] = useState({
    label: '',
    minutes: '',
    seconds: '',
  });

  const onChangeLabel = (e) => {
    setTask({
      ...task,
      label: e.target.value,
    });
  };

  const onChangeTimerValue = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { label, minutes, seconds } = task;
    const { addItem } = props;

    const min = Number(minutes.trim());
    const sec = Number(seconds.trim());
    let time = min * 60 + sec;

    if (time === 0) {
      time = null;
    }

    addItem(label, time);

    setTask({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  const { label, minutes, seconds } = task;

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={label}
        autoFocus
        onChange={onChangeLabel}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        name="minutes"
        value={minutes}
        type="number"
        onChange={onChangeTimerValue}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        name="seconds"
        value={seconds}
        type="number"
        onChange={onChangeTimerValue}
      />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
};

export default NewTaskForm;
