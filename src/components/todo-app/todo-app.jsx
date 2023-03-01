import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './todo-app.css';

export default class TodoApp extends Component {
  maxId = 100;

  static defaultProps = {
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

  static propTypes = {
    defaultTasks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        done: PropTypes.bool,
        id: PropTypes.number,
        created: PropTypes.instanceOf(Date),
      })
    ),
  };

  state = {
    todoData: this.props.defaultTasks,
    filter: 'all',
    editingItemId: null,
  };

  handleEditButtonClick = (id) => {
    this.setState({
      editingItemId: id,
    });
  };

  changeFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  filteredItems = (items, filter) => {
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

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }));
  };

  onDeleteAllDone = () => {
    this.setState(({ todoData }) => {
      const idx = todoData.filter((el) => el.done !== true);
      const newArrayS = [...idx];

      return {
        todoData: newArrayS,
      };
    });
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
      created: new Date(),
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    newItem.created = new Date();

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  changeItem(arr, propName) {
    const idx = arr.findIndex((el) => el.id === this.state.editingItemId);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, label: propName, created: new Date() };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onChangeItem = (text) => {
    this.setState(({ todoData }) => ({
      todoData: this.changeItem(todoData, text),
    }));
  };

  render() {
    const { todoData, filter } = this.state;
    const countDone = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - countDone;

    return (
      <section className="todo-app">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          todo={this.filteredItems(todoData, filter)}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onEdit={this.handleEditButtonClick}
          editingItemId={this.state.editingItemId}
          onChangeItem={this.onChangeItem}
        />
        <Footer
          onCount={todoCount}
          onDeleteAllDone={this.onDeleteAllDone}
          onChangeFilter={this.changeFilter}
          currentFilter={filter}
        />
      </section>
    );
  }
}
