import { handleActions } from 'redux-actions';

import {
  fetchTasksSuccess,
  fetchTasksCount,
  fetchTasksByUser
} from './actions';

const defaultState = {
  list: []
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
    })
  },
  defaultState
);
