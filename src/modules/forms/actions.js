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
  GET_TASK_FORM,
  GET_TASK_FORM_SUCCESS,
  GET_TASK_FORM_FAILED,
  GET_TASK_VARIABLES,
  GET_TASK_VARIABLES_SUCCESS,
  GET_TASK_VARIABLES_FAILED,
  SET_COMPLETE,
  SET_PROC_ID
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
  getTaskForm,
  getTaskFormSuccess,
  getTaskFormFailed,
  getTaskVariables,
  getTaskVariablesSuccess,
  getTaskVariablesFailed,
  setComplete,
  setProcId
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
  GET_TASK_FORM,
  GET_TASK_FORM_SUCCESS,
  GET_TASK_FORM_FAILED,
  GET_TASK_VARIABLES,
  GET_TASK_VARIABLES_SUCCESS,
  GET_TASK_VARIABLES_FAILED,
  SET_COMPLETE,
  SET_PROC_ID
);