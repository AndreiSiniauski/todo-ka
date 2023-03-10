import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

function TaskFilter({ filter = 'all', onFilterChange = () => {} }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, label }) => {
        const isActive = filter === name;
        const classNames = isActive ? 'selected' : '';

        return (
          <li key={name}>
            <button className={classNames} onClick={() => onFilterChange(name)}>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
