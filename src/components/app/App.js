import { useState } from 'react';
import './App.css';

import Footer from '../footer/footer';
import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';

const App = () => {
  // state = {
  //   todoData: [],
  //   filter: 'all',
  // };

  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');

  let timers = {};

  const addItem = (text, time) => {
    if (!text.trim()) return;
    const newItem = createItem(text, time);

    setTodoData((todoData) => ({
      todoData: [...todoData, newItem],
    }));
  };

  const deleteItem = (id) => {
    clearInterval(timers[id]);
    delete timers[id];

    setTodoData(
      ({ todoData }) => ({
        todoData: todoData.filter((task) => task.id !== id),
      }),
      updateTimers
    );
  };

  const deleteCompleted = () => {
    const complitedTasks = todoData.filter((task) => task.done);
    complitedTasks.forEach((task) => deleteItem(task.id));
  };

  const onToggleDone = (id) => {
    pauseTimer(id);
    setTodoData((todoData) =>
      todoData.map((item) => (item.id === id ? { ...item, done: !item.done, checked: !item.checked } : item))
    );
  };

  const onFilter = (items, filter) => {
    switch (filter) {
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const onFilterSelect = (filter) => {
    setFilter(filter);
  };

  const startTimer = (id) => {
    if (Object.keys(timers).includes(id.toString())) return;

    timers[id] = setInterval(() => {
      setTodoData(({ todoData }) => {
        const task = todoData.find((item) => item.id === id);
        task.time--;

        if (!task.time) {
          clearInterval(timers[id]);
          delete timers[id];
          task.isTimerOn = false;
        } else {
          task.isTimerOn = true;
        }

        return {
          todoData: todoData.map((item) => (item.id === id ? task : item)),
        };
      });
    }, 1000);
  };

  const pauseTimer = (id) => {
    clearInterval(timers[id]);
    delete timers[id];

    setTodoData(({ todoData }) => ({
      todoData: todoData.map((item) => (item.id === id ? { ...item, isTimerOn: false } : item)),
    }));
  };

  const updateTimers = () => {
    Object.values(timers).forEach((timer) => clearInterval(timer));
    timers = {};

    todoData.forEach((task) => {
      if (task.isTimerOn) {
        startTimer(task.id);
      }
    });
  };

  const createItem = (text, time = null) => {
    return {
      label: text,
      done: false,
      checked: false,
      created: new Date(),
      id: Math.random().toString(36).slice(2),
      time: time,
      isTimerOn: false,
    };
  };

  const visibleData = onFilter(todoData, filter);
  const doneCount = todoData.length - todoData.filter((el) => el.done === true).length;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <TaskList
        todoData={visibleData}
        onDelete={deleteItem}
        onToggleDone={onToggleDone}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
      <Footer doneItems={doneCount} deleteCompleted={deleteCompleted} filter={filter} onFilterSelect={onFilterSelect} />
    </div>
  );
};

export default App;
