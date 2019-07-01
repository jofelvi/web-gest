import { createActions } from 'redux-actions';

import {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
  FETCH_TASKS_COUNT,
  FETCH_TASKS_COUNT_SUCCESS,
  FETCH_TASKS_COUNT_FAILED,
  FETCH_TASKS_BY_USER,
  FETCH_TASKS_BY_USER_SUCCESS,
  FETCH_TASKS_BY_USER_FAILED,
  FETCH_TASK_LIST,
  FETCH_TASK_LIST_SUCCESS,
  FETCH_TASK_LIST_FAILED,
  SET_SELECTED_TASK,
  SET_TASK_LIST_FILTER
} from './actionTypes';

export const {
  fetchTasks,
  fetchTasksSuccess,
  fetchTasksFailed,
  fetchTasksCount,
  fetchTasksCountSuccess,
  fetchTasksCountFailed,
  fetchTasksByUser,
  fetchTasksByUserSuccess,
  fetchTasksByUserFailed,
  fetchTaskList,
  fetchTaskListSuccess,
  fetchTaskListFailed,
  setSelectedTask,
  setTaskListFilter
} = createActions(
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
  FETCH_TASKS_COUNT,
  FETCH_TASKS_COUNT_SUCCESS,
  FETCH_TASKS_COUNT_FAILED,
  FETCH_TASKS_BY_USER,
  FETCH_TASKS_BY_USER_SUCCESS,
  FETCH_TASKS_BY_USER_FAILED,
  FETCH_TASK_LIST,
  FETCH_TASK_LIST_SUCCESS,
  FETCH_TASK_LIST_FAILED,
  SET_SELECTED_TASK,
  SET_TASK_LIST_FILTER
);
