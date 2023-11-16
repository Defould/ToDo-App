import { PropTypes } from 'prop-types';

import './footer.css';

import TaskFilter from '../taskFilter/taskFilter';

function Footer({ doneItems, deleteCompleted, filter, onFilterSelect }) {
  return (
    <footer className="footer">
      <span className="todo-count">{doneItems} items left</span>
      <TaskFilter filter={filter} onFilterSelect={onFilterSelect} />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  onDeleteCompleted: () => {},
  onFilterSelect: () => {},
};

Footer.propTypes = {
  doneItems: PropTypes.number,
  onDeleteCompleted: PropTypes.func,
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func,
};

export default Footer;
