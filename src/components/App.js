import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../storage/actions';

import NewUser from './new/new';
import List from './list/list';
import config from '../storage/config'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      showNewUser: false  
    };

    let savedObject = localStorage.getItem(config.STORAGE_KEY);

    this.props.loadTasks(JSON.parse(savedObject));
  }
  render() {
    let { taskList, order, changeOrder, addTask, updateTask, removeTask } = this.props,
      { showNewUser } = this.state,
      toggleOrder = (event) => {
        event.preventDefault();
        changeOrder();
      },
      show = (event) => {
        event.preventDefault();
        this.setState({ showNewUser: true });
      },
      accept = (task) => {
        addTask(task);
        this.setState({ showNewUser: false });
      }, 
      cancel = () => {
        this.setState({ showNewUser: false });
      },
      update = (task) => {
        updateTask(task.id, task);
      },
      remove = (task) => {
        removeTask(task.id);
      };

    return (
      <div className="App">
        <header className="App-header">
          <h1>To Do application</h1> 
          <nav>
            <button type="button" 
              className="btn btn-outline-success" 
              title="Add task"
              onClick={show}>+</button>
            <button type="button" 
              className="btn btn-outline-light" 
              title="Sort tasks"
              onClick={toggleOrder}>Sort</button>
          </nav>
        </header>
        <div className="App-body">
          { showNewUser &&
            <NewUser accept={accept} cancel={cancel}></NewUser>          
          }
          <List items={taskList} order={order} update={update} remove={remove}></List>
        </div>
      </div>
    );
  }
}

export default connect(actions.stateToProps, actions.actionsToProps)(App);
