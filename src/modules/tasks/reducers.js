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
  cleanSelectedTask
} from './actions';

const defaultState = {
  list: [],
  taskList: [],
  sortBy: 'name',
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
    [fetchTasksCount]: (state, { payload }) => ({
      ...state,
      count: payload.tasksCount
    }),
    [fetchTasksByUser]: (state, { payload }) => ({
      ...state,
      byUser: payload.tasksByUser
    }),
    [fetchTaskListSuccess]: (state, { payload }) => ({
      ...state,
      selectedTask: null,
      taskList: payload
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
    })
  },
  defaultState
);
