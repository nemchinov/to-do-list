import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    onChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value });
    }
    onChangeText = (event) => {
        this.setState({ text: event.currentTarget.value });
    }
    onAccept = (event) => {
        const { title, text } = this.state,
            { accept } = this.props;

        event.preventDefault();

        accept({ title, text });
    }
    onCancel = (event) => {
        const { cancel } = this.props;

        event.preventDefault();

        cancel();
    }
    handleKeyPress = (event) => {
        const { title, text } = this.state,
            { accept } = this.props;

        if(event.key === 'Enter' && !!title){
            accept({ title, text });
        }
    }
    render() {
        const { title, text } = this.state,
            { onChangeTitle, handleKeyPress, onChangeText, onAccept, onCancel } = this;

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
                        title="Add task"
                        disabled={!title}
                        onClick={onAccept}>Add task</button>
                    <button type="button" 
                        className="btn btn-outline-secondary" 
                        title="Cancel"
                        onClick={onCancel}>Cancel</button>
                </div>
            </div>            
        );
    }
}

NewUser.propTypes = {
    accept: PropTypes.func,
    cancel: PropTypes.func
};

export default NewUser;
