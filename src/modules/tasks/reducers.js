import { handleActions } from 'redux-actions';

import {
  fetchTasksSuccess,
  fetchTaskSuccess,
  fetchTasksCount,
  fetchTasksByUser,
  fetchTaskListSuccess,
  setSelectedTask,
  setSelectedTaskId,
  setTaskListFilter,
  cleanSelectedTask,
  setTableKey,
  editTaskSuccess,
  fetchTaskMessageSuccess,
  fetchTaskAssigneeUserSuccess,
} from './actions';
import { generateKey } from '../utils'
import moment from 'moment';
const defaultState = {
  list: [],
  taskList: [],
  sortBy: 'name',
  tableKey: generateKey(),
  taskMessage: ''
};

export default handleActions(
  {
    [fetchTasksSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.tasks
    }),
    [fetchTaskSuccess]: (state, { payload }) => ({
      ...state,
      task: payload
    }),
    [fetchTaskMessageSuccess]: (state, { payload }) => ({
      ...state,
      taskMessage: payload
    }),
    
    [fetchTasksCount]: (state, { payload }) => ({
      ...state,
      count: payload.tasksCount
    }),
    [fetchTasksByUser]: (state, { payload }) => ({
      ...state,
      byUser: payload.tasksByUser
    }),
    [fetchTaskListSuccess]: (state, { payload }) => {
      console.log({payload})
      return({
        ...state,
        selectedTask: null,
        taskList: payload
      })
    },

    [editTaskSuccess]: (state, {payload}) => 
    ({
        ...state,
        taskList: [...state.taskList.map(task => {
          if(task.id === payload.id){
            return {
              ...task,
              ...payload.values,
              //due: payload.values.due ? moment(payload.values.due,'YYYY-MM-DDTHH:mm:ssZ').format('DD-MM-YY'): task.due
            }
          }
          return task;
        })],
        selectedTask: {
          ...state.selectedTask,
          ...payload.values,
          //due: payload.values.due ? moment(payload.values.due, 'YYYY-MM-DDTHH:mm:ssZ').format('DD-MM-YY'): state.selectedTask.due
        }
    }),

    [setSelectedTask]: (state, { payload }) => ({
      ...state,
      selectedTask: payload
    }),
    [setSelectedTaskId]: (state, { payload }) => {
      const selectedTask = { ...state.selectedTask, id: payload };
      return { ...state, selectedTask };
    },
    [setTaskListFilter]: (state, { payload }) => ({
      ...state,
      sortBy: payload.sortBy,
      isSorted: payload.isSorted
    }),
    [cleanSelectedTask]: state => ({
      ...state,
      selectedTask: null
    }),
    [setTableKey]:  (state) => ({
      ...state,
      tableKey: generateKey() 
    }),
    [fetchTaskAssigneeUserSuccess]: (state, { payload }) => ({
      ...state,
      usersAsignee: payload.usersAsignee
    }),
    
  },
  defaultState
);
