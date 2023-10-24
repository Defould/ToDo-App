import { Component } from 'react';
import { PropTypes } from 'prop-types';

class NewTaskForm extends Component {
  constructor() {
    super();

    this.state = {
      label: '',
    };

    this.onChangeValue = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();

      if (this.state.label.trim()) {
        this.props.addItem(this.state.label);
        this.setState({ label: '' });
      } else {
        return;
      }
    };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
          onChange={this.onChangeValue}
        />
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
