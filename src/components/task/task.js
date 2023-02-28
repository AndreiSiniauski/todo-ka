import PropTypes from 'prop-types';
import React from 'react';
import { format } from 'date-fns';
import './task.css';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerValue: props.timerCount,
      idTimer: null,
      timeActive: false,
    };
  }

  componentDidUpdate(_, prevState) {
    const { timerValue } = this.state;
    if (prevState.timerValue !== timerValue && timerValue <= 0) {
      this.setState({ timerValue: 0 });
      this.onStopTimer();
    }
  }

  onStartTimer = () => {
    const { timerValue } = this.state;
    const endPoint = Date.now() + timerValue;
    const time = setInterval(() => {
      const now = new Date();
      this.setState({
        timerValue: (endPoint - now) / 1000 + timerValue,
      });
    }, 1000);
    this.setState({ idTimer: time, timeActive: true });
  };

  onStopTimer = () => {
    const { idTimer } = this.state;
    clearInterval(idTimer);
    this.setState({ timeActive: false });
  };

  handlerDone = () => {
    const { onToggleDone } = this.props;
    this.onStopTimer();
    onToggleDone();
  };

  render() {
    const { label, onDeleted, done, creationTime, onEdit } = this.props;
    const { timerValue, timeActive } = this.state;
    console.log(timerValue);
    const timer = format(timerValue * 1000, 'mm:ss');
    const classNames = done ? 'completed' : '';
    const disabledBtn = done ? 'disabled' : false;
    const btnTimer = timeActive ? (
      <button className="icon icon-pause" type="button" aria-label="timer stop" onClick={this.onStopTimer} />
    ) : (
      <button
        className="icon icon-play"
        type="button"
        disabled={disabledBtn}
        aria-label="timer start"
        onClick={this.onStartTimer}
      />
    );

    return (
      <li className={classNames}>
        <div className="view" />
        <input type="checkbox" className="toggle" onChange={this.handlerDone} checked={done} />
        <label htmlFor="task">
          <button className="title" onClick={this.handlerDone} onKeyDown={this.handlerDone} type="button">
            {label}
          </button>
          <span className="description">
            {btnTimer}
            {timer}
          </span>
          <span className="description">{creationTime}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="edit element" onClick={onEdit} />
        <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="delete element" />
      </li>
    );
  }
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
