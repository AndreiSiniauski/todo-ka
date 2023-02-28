import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Task from '../task';
import './task-list.css';

function TaskList({ todo, onDeleted, onToggleDone, onEdit, editingItemId, onChangeItem }) {
  const elements = todo.map((item) => {
    const { id, ...itemProps } = item;
    const created = formatDistanceToNow(item.created, { includeSeconds: true });

    let label;

    function onSubmit(e) {
      e.preventDefault();
      onChangeItem(label);
      onEdit(null);
    }

    function onBlur() {
      onEdit(null);
    }

    function onLabelChange(e) {
      label = e.target.value;
    }

    if (editingItemId === id) {
      return (
        <li className="editing" key={id}>
          <form onSubmit={onSubmit} onBlur={onBlur}>
            <input type="text" className="edit" defaultValue={itemProps.label} onChange={onLabelChange} />
          </form>
        </li>
      );
    }
    return (
      <Task
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        creationTime={created}
        onEdit={() => onEdit(id)}
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
      timerCount: PropTypes.number,
    })
  ).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
