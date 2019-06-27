import { handleActions } from 'redux-actions';

import {
  fetchTasksSuccess,
  fetchTasksCount,
  fetchTasksByUser,
  fetchTaskListSuccess,
  setSelectedTask
} from './actions';

const defaultState = {
  list: [],
  taskList: [],
  sortBy: 'name',
  sortOrder: 'asc',
};

export default handleActions(
  {
    [fetchTasksSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.tasks
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
      taskList: payload
    }),
    [setSelectedTask]: (state, { payload }) => ({
      ...state,
      selectedTask: payload
    })
  },
  defaultState
);
