import { Component } from 'react';
import { PropTypes } from 'prop-types';

import './newTaskForm.css';

class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onChangeTimerValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { label, minutes, seconds } = this.state;
    const { addItem } = this.props;

    const min = Number(minutes.trim());
    const sec = Number(seconds.trim());
    let time = min * 60 + sec;

    if (time === 0) {
      time = null;
    }

    addItem(label, time);

    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    const { label, minutes, seconds } = this.state;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
          autoFocus
          onChange={this.onChangeLabel}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="minutes"
          value={minutes}
          type="number"
          onChange={this.onChangeTimerValue}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="seconds"
          value={seconds}
          type="number"
          onChange={this.onChangeTimerValue}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    );
  }

  static defaultProps = {
    addItem: () => {},
  };

  static propTypes = {
    addItem: PropTypes.func,
  };
}

export default NewTaskForm;
