import React, { Component } from 'react';

import './new.css';

class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      title: 'New title',
      text: '',
      complited: false
    };
  }
  render() {
    const { title, text } = this.state,
        { accept, cancel } = this.props,
        onChangeTitle = (event) => {
            this.setState({ title: event.currentTarget.value });
        },
        onChangeText = (event) => {
            this.setState({ text: event.currentTarget.value });
        },
        onAccept = (event) => {
            event.preventDefault();
            accept({ title, text });
        },
        onCancel = (event) => {
            event.preventDefault();
            cancel();
        },
        handleKeyPress = (event) => {
            if(event.key === 'Enter' && !!title){
                accept({ title, text });
            }
        };

    return (
        <div className="new-user">
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="new-title">Task title</span>
            </div>
            <input type="text" 
                className="form-control" 
                placeholder="Title" 
                aria-label="Title" 
                aria-describedby="new-title" 
                onChange={onChangeTitle}
                onKeyPress={handleKeyPress}
                value={title} />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="new-task">Task text</span>
            </div>
            <input type="text" 
                className="form-control" 
                placeholder="Task" 
                aria-label="Task" 
                aria-describedby="new-task" 
                onChange={onChangeText}
                onKeyPress={handleKeyPress}
                value={text}/>
            </div>
            <div className="new-user-btn-box">
                <button type="button" 
                    className="btn btn-outline-success" 
                    placeholder="Add task"
                    disabled={!title}
                    onClick={onAccept}>Add task</button>
                <button type="button" 
                    className="btn btn-outline-secondary" 
                    placeholder="Cancel"
                    onClick={onCancel}>Cancel</button>
            </div>
        </div>            
    );
  }
}

export default NewUser;
