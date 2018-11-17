import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './list.css';

function sort(order, itemA, itemB) {
    let v = itemA.title > itemB.title ? 1 : (itemA.title === itemB.title ? 0 : -1);
    return order === 'asc' ? v : v * -1;
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editId: null,
            text: ''
        };
    }
    onCheckChange = (item, event) => {
        const { update } = this.props;
        event.preventDefault();
        update({...item, complited: event.currentTarget.checked});
    }
    onRemove = (item) => {
        const { remove } = this.props;
        remove(item);
    }
    onEdit = (item, event) => {
        event.preventDefault();
        this.setState({
            editId: item.id,
            text: item.text
        });
    }
    onChangeText = (event) => {
        this.setState({ text: event.currentTarget.value });
    }
    onAccept = (item, event) => {
        const { update } = this.props,
            { text } = this.state;
        if (event) { event.preventDefault(); }
        update({ ...item, text });
        this.onCancel();
    }
    onCancel = (event) => {
        if (event) { event.preventDefault(); }
        this.setState({
            editId: null,
            text: ''
        });
    }
    handleKeyPress = (item, event) => {
        const { text } = this.state;
        if(event.key === 'Enter' && !!text) {
            this.onAccept(item);
        }
    }
    render() {
        const { items, order } = this.props,
            { editId, text } = this.state,
            { onCheckChange, onChangeText, handleKeyPress, onAccept, onCancel, onRemove, onEdit } = this;

        return (
            <div className="task-list">
                {!(items && items.length) ?
                    <label>Tasks not found</label> : ''
                }
                {items ? items.sort(sort.bind(null, order)).map((item) => (
                    <div className={!item.complited ? 'alert alert-primary' : 'alert alert-success'} role="alert" key={item.id}>
                        <h5 className='alert-heading'>
                            { !item.complited ? 
                                <input type="checkbox" 
                                    className="form-check-input" 
                                    title="Set complited"
                                    onChange={onCheckChange.bind(null, item)} 
                                    checked={!!item.complited}/> : ''
                            }
                        
                            <span>{item.title}</span>
                        </h5>
                        {editId === item.id ?
                            <div className="input-group">
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Task text" 
                                    aria-label="Task text" 
                                    aria-describedby="basic-addon2" 
                                    onChange={onChangeText}
                                    onKeyPress={handleKeyPress.bind(null, item)}
                                    value={text}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" 
                                        type="button"
                                        disabled={!text}
                                        onClick={onAccept.bind(null, item)}>Change</button>
                                    <button className="btn btn-outline-secondary" 
                                        type="button"
                                        onClick={onCancel}>Cancel</button>
                                </div>
                            </div>
                            : <span className="task-text">{item.text}</span>
                        }
                        <button type="button" className="close" aria-label="Close" onClick={onRemove.bind(null, item)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {editId !== item.id && !item.complited ?
                            <button type="button" className="edit" onClick={onEdit.bind(null, item)}>
                                edit
                            </button>   : ''
                        }
                    </div>
                )) : ''}
            </div>            
        );
    }
}

List.propTypes = {
    update: PropTypes.func,
    remove: PropTypes.func,
    items: PropTypes.array,
    order: PropTypes.string
};

export default List;
