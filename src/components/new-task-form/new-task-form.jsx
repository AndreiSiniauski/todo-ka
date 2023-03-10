import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const regular = /^^\s*$/;

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onTimerChange = ({ target }) => {
    const { name, value } = target;
    if (value < 60) {
      name === 'min' ? setMin(value.replace(/\D/, '')) : setSec(value.replace(/\D/, ''));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const invalidText = regular.test(label);
    if (!invalidText) {
      const countSec = min * 60 + +sec;
      onItemAdded(label, countSec);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={label}
          maxLength="15"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          name="min"
          onChange={onTimerChange}
          maxLength="2"
          value={min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          name="sec"
          onChange={onTimerChange}
          maxLength="2"
          value={sec}
        />
        <button type="submit" aria-label="submit" />
      </form>
    </header>
  );
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;
