import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './task.css';

function Task(props) {
  const [timerValue, setTimerValue] = useState(props.timerCount || 300);
  const [idTimer, setIdTimer] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    if (timerValue <= 0) {
      setTimerValue(0);
      onStopTimer();
    }
  }, [timerValue]);

  const onStartTimer = () => {
    const endPoint = Date.now() + timerValue;
    const time = setInterval(() => {
      const now = new Date();
      setTimerValue((endPoint - now) / 1000 + timerValue);
    }, 1000);
    setIdTimer(time);
    setTimeActive(true);
  };

  const onStopTimer = () => {
    clearInterval(idTimer);
    setTimeActive(false);
  };

  const handlerDone = () => {
    onStopTimer();
    props.onToggleDone();
  };

  const { label, onDeleted, done, creationTime, onEdit } = props;
  const timer = format(timerValue * 1000, 'mm:ss');
  const classNames = done ? 'completed' : '';
  const disabledBtn = done ? 'disabled' : false;
  const btnTimer = timeActive ? (
    <button className="icon icon-pause" type="button" aria-label="timer stop" onClick={onStopTimer} />
  ) : (
    <button
      className="icon icon-play"
      type="button"
      disabled={disabledBtn}
      aria-label="timer start"
      onClick={onStartTimer}
    />
  );

  return (
    <li className={classNames}>
      <div className="view" />
      <input type="checkbox" className="toggle" onChange={handlerDone} checked={done} />
      <label htmlFor="task">
        <button className="title" onClick={handlerDone} onKeyDown={handlerDone} type="button">
          {label}
        </button>
        <span className="description">
          {btnTimer}
          {timer}
        </span>
        <span className="description word">
          <span>{creationTime}</span>
        </span>
      </label>
      <button className="icon icon-edit" type="button" aria-label="edit element" onClick={onEdit} />
      <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="delete element" />
    </li>
  );
}

Task.defaultProps = {
  label: 'Не задано',
  done: false,
  onToggleDone: () => {},
  onDeleted: () => {},
  creationTime: new Date(),
  timerCount: 300,
};

Task.propTypes = {
  done: PropTypes.bool,
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  creationTime: PropTypes.string,
  timerCount: PropTypes.number,
};

export default Task;
