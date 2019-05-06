import { createActions } from 'redux-actions';

import {
  START_PROCESS,
  START_PROCESS_SUCCESS,
  START_PROCESS_FAILED,
  CONTINUE_PROCESS,
  CONTINUE_PROCESS_SUCCESS,
  CONTINUE_PROCESS_FAILED,
  CHANGE_PROCESS_STATE,
  CHANGE_PROCESS_STATE_SUCCESS,
  CHANGE_PROCESS_STATE_FAILED,
  COMPLETE_TASK,
  COMPLETE_TASK_SUCCESS,
  GET_TASK_VARIABLES,
  GET_TASK_VARIABLES_SUCCESS,
  GET_TASK_VARIABLES_FAILED,
  COMPLETE
} from './actionTypes';

export const {
  startProcess,
  startProcessSuccess,
  startProcessFailed,
  continueProcess,
  continueProcessSuccess,
  continueProcessFailed,
  changeProcess,
  changeProcessSuccess,
  changeProcessFailed,
  completeTask,
  completeTaskSuccess,
  getTaskVariables,
  getTaskVariablesSuccess,
  getTaskVariablesFailed,
  complete
} = createActions(
  START_PROCESS,
  START_PROCESS_SUCCESS,
  START_PROCESS_FAILED,
  CONTINUE_PROCESS,
  CONTINUE_PROCESS_SUCCESS,
  CONTINUE_PROCESS_FAILED,
  CHANGE_PROCESS_STATE,
  CHANGE_PROCESS_STATE_SUCCESS,
  CHANGE_PROCESS_STATE_FAILED,
  COMPLETE_TASK,
  COMPLETE_TASK_SUCCESS,
  GET_TASK_VARIABLES,
  GET_TASK_VARIABLES_SUCCESS,
  GET_TASK_VARIABLES_FAILED,
  COMPLETE
);
