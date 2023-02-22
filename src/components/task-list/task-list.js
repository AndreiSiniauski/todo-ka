import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Task from '../task';
import './task-list.css';

function TaskList({ todo, onDeleted, onToggleDone }) {
  const elements = todo.map((item) => {
    const { id, ...itemProps } = item;
    const created = formatDistanceToNow(item.created, { includeSeconds: true });
    return (
      <Task
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        creationTime={created}
      />
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  );
}

TaskList.defaultProps = {
  todo: [],
  onDeleted: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      created: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
