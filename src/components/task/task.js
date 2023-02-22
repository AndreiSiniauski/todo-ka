import React, { Component } from "react";
import PropTypes from 'prop-types';
import './task.css';


export default class Task extends Component {

  static defaultProps = {
    label: 'Task',
    onDeleted: () => {},
    done: false,
    onToggleDone: () => {},
    creationTime:  ''
  }

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    done: PropTypes.bool,
    onToggleDone: PropTypes.func,
    creationTime: PropTypes.string
  }

  state = {
    done: false
  }

 render() {

    const { label, onDeleted, done, onToggleDone, creationTime } = this.props;

    let classNames = 'active';

    if (done) {
      classNames += ' completed';
    }

    return (
        <li className={ classNames }>
        <div className="view">
          <input className="toggle" 
                 type="checkbox"
                 checked={ done }
                 onChange={ onToggleDone }
                 />
          <label>
            <span className="description" onClick={ onToggleDone }> { label } </span>
            <span className="created">created { creationTime }</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"
                  onClick={ onDeleted }></button>
        </div>
      </li>
    );
  };
};
