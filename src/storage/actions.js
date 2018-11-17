import { bindActionCreators } from 'redux';

import types from './types';

const changeOrder = () => {
        return {
            type: types.ACTION_CHANGE_ORDER
        };
    },
    addTask = (task) => {
        return {
            type: types.ACTION_ADD_TASK,
            payload: task
        };
    },
    updateTask = (id, task) => {
        return {
            type: types.ACTION_UPDATE_TASK,
            payload: { id, task }
        };
    },
    removeTask = (id) => {
        return {
            type: types.ACTION_REMOVE_TASK,
            payload: id
        };
    },
    loadTasks = (tasks) => {
        return {
            type: types.ACTION_LOAD_TASKS,
            payload: tasks
        };
    };

const stateToProps = (state) => {
        let { order, taskList } = state;
        return { order, taskList };
    },
    actionsToProps = (dispatch) => {
        return {
            changeOrder: bindActionCreators(changeOrder, dispatch),
            addTask: bindActionCreators(addTask, dispatch),
            updateTask: bindActionCreators(updateTask, dispatch),
            removeTask: bindActionCreators(removeTask, dispatch),
            loadTasks: bindActionCreators(loadTasks, dispatch)
        };
    };


export default {
    loadTasks, changeOrder, addTask, updateTask, removeTask, stateToProps, actionsToProps
};