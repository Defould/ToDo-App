import './taskFilter.css';

function TaskFilter({ filter, onFilterSelect }) {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const btns = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const clazz = active ? 'selected' : '';

    return (
      <li key={name}>
        <button className={clazz} onClick={() => onFilterSelect(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{btns}</ul>;
}

TaskFilter.defaultProps = {
  onFilterSelect: () => {},
};

export default TaskFilter;
