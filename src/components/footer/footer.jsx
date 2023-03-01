import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';

import './footer.css';

function Footer({ onCount, onDeleteAllDone, currentFilter, onChangeFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{onCount} items left</span>
      <TaskFilter filter={currentFilter} onFilterChange={onChangeFilter} />
      <button className="clear-completed" onClick={onDeleteAllDone}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  onCount: 0,
  onDeleteAllDone: () => {},
  currentFilter: 'all',
  onChangeFilter: () => {},
};

Footer.propTypes = {
  onCount: PropTypes.number.isRequired,
  onDeleteAllDone: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Footer;
