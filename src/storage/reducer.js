import types from './types';
import config from './config';

function getIndex(taskList, id) {
    return taskList.findIndex((v) => v.id === id);
}

function updateStorage(data) {
    localStorage.setItem(config.STORAGE_KEY, JSON.stringify(data));
}

const rootReducer = (state, action) => {
    const { taskList, order } = state;
    let index = -1;

    switch (action.type) {
        case types.ACTION_CHANGE_ORDER: {
            return { ...state, order: order === 'asc' ? 'desc' : 'asc' };
        }
        case types.ACTION_ADD_TASK: {
            action.payload.id = window.btoa(JSON.stringify(action.payload) + (new Date().valueOf()));
            
            let list = [...taskList, action.payload];
            
            updateStorage(list);

            return { ...state, taskList: list }; 
        }
        case types.ACTION_UPDATE_TASK: {
            const { id, task } = action.payload;
            
            index = getIndex(taskList, id);

            if (index > -1) {
                let list = [...taskList.slice(0, index), task, ...taskList.slice(index + 1)];

                updateStorage(list);

                return { ...state, taskList: list };
            } else {
                return state;
            } 
        }
        case types.ACTION_REMOVE_TASK: {
            index = getIndex(taskList, action.payload);

            if (index > -1) {
                let list = [...taskList.slice(0, index), ...taskList.slice(index + 1)];

                updateStorage(list);

                return { ...state, taskList: [...taskList.slice(0, index), ...taskList.slice(index + 1)] };
            } else {
                return state;
            }
        }
        case types.ACTION_LOAD_TASKS: {
            return { ...state, taskList: (action.payload || taskList)};
        }
        default: {
            return state; 
        }
    }
};

export default rootReducer;