import { Component } from 'react';

import './App.css';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      todoData: [
        this.createItem('Перенести задачи'),
        this.createItem('Изменить состояния'),
        this.createItem('Реализовать удаление'),
      ],
      filter: 'all',
    };
  }

  createItem = (text) => {
    return {
      label: text,
      done: false,
      checked: false,
      created: new Date(),
      id: Math.random().toString(36).slice(2),
    };
  };

  addItem = (text) => {
    const newItem = this.createItem(text);

    this.setState((state) => ({
      todoData: [...state.todoData, newItem],
    }));
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.id !== id),
    }));
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.done),
    }));
  };

  toggleProp = (arr, id, propName, prop2Name) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
      [prop2Name]: !oldItem[prop2Name],
    };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState((state) => ({
      todoData: this.toggleProp(state.todoData, id, 'done', 'checked'),
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
        <TaskList todoData={visibleData} onDelete={this.deleteItem} onToggleDone={this.onToggleDone} />
        <Footer
          doneItems={doneCount}
          onDeleteCompleted={this.deleteCompleted}
          filter={filter}
          onFilterSelect={this.onFilterSelect}
        />
      </div>
    );
  }
}

export default App;
