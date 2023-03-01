import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  };

  state = {
    label: '',
    min: '',
    sec: '',
  };

  regular = /^^\s*$/;

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onTimerChange = ({ target }) => {
    const { name, value } = target;
    if (value < 60) {
      this.setState({
        [name]: value.replace(/\D/, ''),
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, sec, min } = this.state;
    const { onItemAdded } = this.props;
    const invalidText = this.regular.test(label);
    if (!invalidText) {
      const countSec = min * 60 + +sec;
      onItemAdded(label, countSec);
      this.setState({
        label: '',
        sec: '',
        min: '',
      });
    }
  };

  render() {
    const { label, sec, min } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={label}
            maxLength="15"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            name="min"
            onChange={this.onTimerChange}
            maxLength="2"
            value={min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            name="sec"
            onChange={this.onTimerChange}
            maxLength="2"
            value={sec}
          />
          <button type="submit" aria-label="submit" />
        </form>
      </header>
    );
  }
}
