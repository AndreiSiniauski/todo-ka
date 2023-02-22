import React from "react";
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Task from "../task/task";
import './task-list.css';

const TaskList = ( { todos, onDeleted, onToggleDone } ) => {

    const elements = todos.map((item) => {
        
        const {id, ...itemProps} = item;
        let created = formatDistanceToNow(item.created, {includeSeconds: true})
        return (
            < Task {...itemProps} 
                key={id}
                onDeleted={() => onDeleted(id)}
                onToggleDone={() => onToggleDone(id)}
                creationTime={created}
                />
        )
    })

    return (
    <section className='main'>
        <ul className="todo-list">
            {elements}
        </ul>
    </section>
    );
};

TaskList.defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleDone: () => {}
};

TaskList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            done: PropTypes.bool.isRequired,
            id: PropTypes.number.isRequired,
            created: PropTypes.instanceOf(Date)
        })
    ).isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func
};

export default TaskList;