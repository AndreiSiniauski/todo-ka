import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './todo-app.css';

function TodoApp({ defaultTasks }) {
  const [todoData, setTodoData] = useState(defaultTasks);
  const [filter, setFilter] = useState('all');
  const [editingItemId, setEditingItemId] = useState(null);
  let maxId = useRef(100);

  const handleEditButtonClick = (id) => {
    setEditingItemId(id);
  };

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const filteredItems = (items, filter) => {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => !item.done);
    } else if (filter === 'completed') {
      return items.filter((item) => item.done);
    } else {
      return items;
    }
  };

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

    setTodoData(newArray);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData((todoData) => toggleProperty(todoData, id, 'done'));
  };

  const onDeleteAllDone = () => {
    const idx = todoData.filter((el) => el.done !== true);
    const newArrayS = [...idx];

    setTodoData(newArrayS);
  };

  const createTodoItem = (label, timer) => {
    return {
      label,
      done: false,
      id: maxId.current++,
      created: new Date(),
      timerCount: timer,
    };
  };

  const addItem = (text, timer) => {
    const newItem = createTodoItem(text, timer);
    newItem.created = new Date();

    setTodoData([...todoData, newItem]);
  };

  const changeItem = (arr, propName) => {
    const idx = arr.findIndex((el) => el.id === editingItemId);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, label: propName, created: new Date() };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onChangeItem = (text) => {
    setTodoData((todoData) => changeItem(todoData, text));
  };

  const countDone = todoData.filter((el) => el.done).length;

  const todoCount = todoData.length - countDone;

  return (
    <section className="todo-app">
      <NewTaskForm onItemAdded={addItem} />
      <TaskList
        todo={filteredItems(todoData, filter)}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onEdit={handleEditButtonClick}
        editingItemId={editingItemId}
        onChangeItem={onChangeItem}
      />
      <Footer
        onCount={todoCount}
        onDeleteAllDone={onDeleteAllDone}
        onChangeFilter={changeFilter}
        currentFilter={filter}
      />
    </section>
  );
}

TodoApp.defaultProps = {
  defaultTasks: [
    {
      label: 'Completed task',
      done: false,
      id: 1,
      created: new Date(),
    },
    {
      label: 'Editing task',
      done: false,
      id: 2,
      created: new Date(),
    },
    {
      label: 'Active task',
      done: false,
      id: 3,
      created: new Date(),
    },
  ],
};

TodoApp.propTypes = {
  defaultTasks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      done: PropTypes.bool,
      id: PropTypes.number,
      created: PropTypes.instanceOf(Date),
    })
  ),
};

export default TodoApp;
