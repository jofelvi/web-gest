import { handleActions } from 'redux-actions';

import {
  startProcessSuccess,
  continueProcessSuccess,
  completeTaskSuccess,
  changeProcessSuccess,
  getTaskFormSuccess,
  getTaskVariablesSuccess,
  setComplete,
  setProcId,
  setProcess
} from './actions';

const defaultState = {
  processStep: '',
  process: '',
  processKey: '',
  taskId: '',
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
    [getTaskFormSuccess]: (state, { payload }) => ({
      ...state,
      taskName: payload.taskName
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
    [setComplete]: (state, { payload }) => ({
      ...state,
      completed: payload,
      process: '',
      processKey: '',
      processStep: '',
      taskName: '',
      taskId: '',
      taskVariables: null,
      procId: null
    }),
    [setProcId]: (state, { payload }) => ({
      ...state,
      procId: payload
    })
  },
  defaultState
);
