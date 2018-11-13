import React, { Component } from 'react';

import './list.css';

function sort(order, itemA, itemB) {
    let v = itemA.title > itemB.title ? 1 : (itemA.title === itemB.title ? 0 : -1);
    return order === 'asc' ? v : v * -1;
}

class List extends Component {
  render() {
    const { items, order, update, remove } = this.props,
        onCheckChange = (item, event) => {
            update({...item, complited: event.currentTarget.checked});
        },
        onRemove = (item) => {
            remove(item);
        };

    return (
        <div className="task-list">
            {items ? items.sort(sort.bind(null, order)).map((item) => (
                <div className={!item.complited ? 'alert alert-primary' : 'alert alert-success'} role="alert" key={item.id}>
                    <h5 className='alert-heading'>
                        <input type="checkbox" 
                            className="form-check-input" 
                            title="Set complited"
                            onChange={onCheckChange.bind(null, item)} 
                            value={item.complited}
                            checked={item.complited}/>
                        <span>{item.title}</span>
                    </h5>
                    {item.text}
                    <button type="button" className="close" aria-label="Close" onClick={onRemove.bind(null, item)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <button type="button" className="edit">
                        edit
                    </button>
                </div>
            )) : ''}
        </div>            
    );
  }
}

export default List;
