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
        console.log(this.timers[id]);
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
    console.log(this.timers[id]);
    delete this.timers[id];

    if (Object.keys(this.timers).length === 0) {
      this.setState({
        todoData: this.state.todoData.map((item) => (item.isTimerOn ? { ...item, isTimerOn: false } : item)),
      });
    } else {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((item) => (item.id === id ? { ...item, isTimerOn: false } : item)),
      }));
    }
  };

  // updateTimers() {
  //   Object.values(this.timers).forEach((timer) => clearInterval(timer));
  //   this.timers = {};

  //   this.state.todoData.forEach((task) => {
  //     if (task.isTimerOn) {
  //       this.startTimer(task.id);
  //     }
  //   });
  // }

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

// import { Component } from 'react';

// import './App.css';

// import NewTaskForm from '../newTaskForm/newTaskForm';
// import TaskList from '../taskList/taskList';
// import Footer from '../footer/footer';

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       todoData: [],
//       filter: 'all',
//     };
//   }

//   createItem = (text, minutes, seconds) => {
//     return {
//       label: text,
//       done: false,
//       checked: false,
//       created: new Date(),
//       id: Math.random().toString(36).slice(2),
//       timer: {
//         minutes: parseInt(minutes, 10) || 0,
//         seconds: parseInt(seconds, 10) || 0,
//       },
//       isTimerOn: false,
//     };
//   };

//   addItem = (text, minutes, seconds) => {
//     const newItem = this.createItem(text, minutes, seconds);

//     this.setState((state) => ({
//       todoData: [...state.todoData, newItem],
//     }));
//   };

//   deleteItem = (id) => {
//     this.setState(({ todoData }) => ({
//       todoData: todoData.filter((el) => el.id !== id),
//     }));
//   };

//   deleteCompleted = () => {
//     this.setState(({ todoData }) => ({
//       todoData: todoData.filter((el) => !el.done),
//     }));
//   };

//   toggleProp = (arr, id, propName, prop2Name) => {
//     const idx = arr.findIndex((el) => el.id === id);
//     const oldItem = arr[idx];
//     const newItem = {
//       ...oldItem,
//       [propName]: !oldItem[propName],
//       [prop2Name]: !oldItem[prop2Name],
//     };
//     return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
//   };

//   onToggleDone = (id) => {
//     this.setState((state) => ({
//       todoData: this.toggleProp(state.todoData, id, 'done', 'checked'),
//     }));
//   };

//   // onToggleDone = (id) => {
//   //   this.setState((state) => ({
//   //     todoData: state.todoData.map((item) => {
//   //       if (item.id === id) {
//   //         const newItem = {
//   //           ...item,
//   //           done: !item.done,
//   //           checked: !item.checked,
//   //           isTimerOn: false, // Остановить таймер, когда задача выполнена
//   //         };

//   //         // Если таймер в данный момент запущен, очистить интервал
//   //         if (item.isTimerOn) {
//   //           clearInterval(this.intervalId);
//   //           this.intervalId = null;
//   //         }

//   //         return newItem;
//   //       }
//   //       return item;
//   //     }),
//   //   }));
//   // };

//   onFilter = (items, filter) => {
//     switch (filter) {
//       case 'active':
//         return items.filter((item) => !item.done);
//       case 'completed':
//         return items.filter((item) => item.done);
//       default:
//         return items;
//     }
//   };

//   onFilterSelect = (filter) => {
//     this.setState({ filter });
//   };

//   startTimer = (id) => {
//     this.setState(
//       (state) => {
//         const updatedData = state.todoData.map((item) =>
//           item.id === id && !item.isTimerOn ? { ...item, isTimerOn: true } : item
//         );
//         return { todoData: updatedData };
//       },
//       () => {
//         this.updateTimer(id);
//       }
//     );
//   };

//   pauseTimer = (id) => {
//     console.log('pause');
//     this.setState(
//       (state) => ({
//         todoData: state.todoData.map((item) => (item.id === id ? { ...item, isTimerOn: false } : item)),
//       }),
//       () => {
//         clearInterval(this.intervalId);
//         this.intervalId = null;
//       }
//     );
//   };

//   updateTimer = (id) => {
//     if (!this.intervalId) {
//       const updateState = () => {
//         this.setState((state) => ({
//           todoData: state.todoData.map((item) => {
//             if (item.id === id && item.isTimerOn) {
//               const { seconds, minutes } = item.timer;
//               const newSeconds = seconds - 1;
//               const newMinutes = minutes;

//               if (newSeconds < 0 && newMinutes > 0) {
//                 return {
//                   ...item,
//                   timer: {
//                     minutes: newMinutes - 1,
//                     seconds: 59,
//                   },
//                 };
//               } else if (newSeconds < 0 && newMinutes === 0) {
//                 clearInterval(this.intervalId);
//                 this.intervalId = null;
//                 return {
//                   ...item,
//                   isTimerOn: false,
//                   timer: {
//                     minutes: 0,
//                     seconds: 0,
//                   },
//                 };
//               } else {
//                 return {
//                   ...item,
//                   timer: {
//                     minutes: newMinutes,
//                     seconds: newSeconds,
//                   },
//                 };
//               }
//             }
//             return item;
//           }),
//         }));
//       };

//       this.intervalId = setInterval(updateState, 1000);
//     }
//   };

//   render() {
//     const { todoData, filter } = this.state;
//     const visibleData = this.onFilter(todoData, filter);
//     const doneCount = todoData.length - todoData.filter((el) => el.done === true).length;

//     return (
//       <div className="todoapp">
//         <header className="header">
//           <h1>todos</h1>
//           <NewTaskForm addItem={this.addItem} />
//         </header>
//         <TaskList
//           todoData={visibleData}
//           onDelete={this.deleteItem}
//           onToggleDone={this.onToggleDone}
//           startTimer={this.startTimer}
//           pauseTimer={this.pauseTimer}
//           updateTimer={this.updateTimer}
//         />
//         <Footer
//           doneItems={doneCount}
//           onDeleteCompleted={this.deleteCompleted}
//           filter={filter}
//           onFilterSelect={this.onFilterSelect}
//         />
//       </div>
//     );
//   }
// }

// export default App;
