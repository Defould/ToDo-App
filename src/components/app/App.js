import { Component } from 'react';

import './App.css';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

class App extends Component {
  minId = 0;

  state = {
    todoData: [],
    filter: 'all',
  };

  timers = {};

  addItem = (text, time) => {
    if (!text.trim()) return;
    const newItem = this.createItem(text, time);

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }));
  };

  deleteItem = (id) => {
    clearInterval(this.timers[id]);
    delete this.timers[id];

    this.setState(
      ({ todoData }) => ({
        todoData: todoData.filter((task) => task.id !== id),
      }),
      this.updateTimers
    );
  };

  deleteCompleted = () => {
    const complitedTasks = this.state.todoData.filter((task) => task.done);
    complitedTasks.forEach((task) => this.deleteItem(task.id));
  };

  onToggleDone = (id) => {
    this.pauseTimer(id);
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => (item.id === id ? { ...item, done: !item.done, checked: !item.checked } : item)),
    }));
  };

  onFilter = (items, filter) => {
    switch (filter) {
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  startTimer = (id) => {
    if (Object.keys(this.timers).includes(id.toString())) return;

    this.timers[id] = setInterval(() => {
      this.setState(({ todoData }) => {
        const task = todoData.find((item) => item.id === id);
        task.time--;

        if (!task.time) {
          clearInterval(this.timers[id]);
          delete this.timers[id];
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

  pauseTimer = (id) => {
    clearInterval(this.timers[id]);
    delete this.timers[id];

    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => (item.id === id ? { ...item, isTimerOn: false } : item)),
    }));
  };

  updateTimers() {
    Object.values(this.timers).forEach((timer) => clearInterval(timer));
    this.timers = {};

    this.state.todoData.forEach((task) => {
      if (task.isTimerOn) {
        this.startTimer(task.id);
      }
    });
  }

  createItem = (text, time = null) => {
    return {
      label: text,
      done: false,
      checked: false,
      created: new Date(),
      id: this.minId++,
      time: time,
      isTimerOn: false,
    };
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleData = this.onFilter(todoData, filter);
    const doneCount = todoData.length - todoData.filter((el) => el.done === true).length;

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <TaskList
          todoData={visibleData}
          onDelete={this.deleteItem}
          onToggleDone={this.onToggleDone}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
        />
        <Footer
          doneItems={doneCount}
          deleteCompleted={this.deleteCompleted}
          filter={filter}
          onFilterSelect={this.onFilterSelect}
        />
      </div>
    );
  }
}

export default App;
