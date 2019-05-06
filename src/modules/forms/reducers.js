import { handleActions } from 'redux-actions';

import {
  startProcessSuccess,
  continueProcessSuccess,
  completeTaskSuccess,
  changeProcessSuccess,
  getTaskVariablesSuccess,
  complete
} from './actions';

const defaultState = {
  processStep: 'startForm',
  process: 'signup',
  processKey: 'signup',
  taskName: 'signup',
  finishedProcess: false,
  completed: false
};

export default handleActions(
  {
    [startProcessSuccess]: (state, { payload }) => ({
      ...state,
      process: payload.process,
      taskName: payload.taskName,
      processStep: 'startForm',
      processKey: payload.key,
      finishedProcess: false
    }),
    [continueProcessSuccess]: (state, { payload }) => ({
      ...state,
      taskName: payload.taskName,
      taskId: payload.taskId
    }),
    [completeTaskSuccess]: (state, { payload }) => ({
      ...state,
      taskName: payload.taskName,
      taskId: payload.taskId
    }),
    [changeProcessSuccess]: state => ({
      ...state,
      finishedProcess: !state.finishedProcess
    }),
    [getTaskVariablesSuccess]: (state, { payload }) => ({
      ...state,
      taskVariables: payload.taskVariables
    }),
    [complete]: state => ({
      ...state,
      completed: true
    })
  },
  defaultState
);
