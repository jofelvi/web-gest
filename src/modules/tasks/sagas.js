import { takeLatest, call, put } from 'redux-saga/effects';

import {
  fetchTasksSuccess,
  fetchTasksFailed,
  fetchTasksCountSuccess,
  fetchTasksCountFailed,
  fetchTasksByUserSuccess,
  fetchTasksByUserFailed,
  fetchTaskListSuccess,
  fetchTaskListFailed
} from './actions';

import {
  FETCH_TASKS,
  FETCH_TASKS_COUNT,
  FETCH_TASKS_BY_USER,
  FETCH_TASK_LIST
} from './actionTypes';

import * as api from './api';

function* fetchTasks() {
  try {
    const response = yield call(api.fetchTasks);
    yield put(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchTasksFailed());
  }
}

export function* watchFetchTasks() {
  yield takeLatest(FETCH_TASKS, fetchTasks);
}

function* fetchTasksCount() {
  try {
    const response = yield call(api.fetchTasksCount);
    yield put(fetchTasksCountSuccess({ tasksCount: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchTasksCountFailed());
  }
}

export function* watchFetchTasksCount() {
  yield takeLatest(FETCH_TASKS_COUNT, fetchTasksCount);
}

function* fetchTasksByUser({ payload }) {
  try {
    const response = yield call(api.fetchTasksByUser, payload.user);
    yield put(fetchTasksByUserSuccess({ tasksByUser: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchTasksByUserFailed());
  }
}

export function* watchFetchTasksByUser() {
  yield takeLatest(FETCH_TASKS_BY_USER, fetchTasksByUser);
}

function* fetchTaskList({ payload }) {
  try {
    const taskListType = payload.type;
    switch (taskListType) {
      case 'user':
        const userResponse = yield call(api.fetchUserTaskList);
        yield put(fetchTaskListSuccess(userResponse.data));
        break;
      case 'group':
        const groupResponse = yield call(api.fetchGroupTaskList);
        yield put(fetchTaskListSuccess(groupResponse.data));
        break;
      case 'all':
        const response = yield call(api.fetchTaskList);
        yield put(fetchTaskListSuccess(response.data));
        break;
      default:
        const defaultResponse = yield call(api.fetchTaskList);
        yield put(fetchTaskListSuccess(defaultResponse.data));
    }
  } catch (e) {
    console.error(e);
    yield put(fetchTaskListFailed());
  }
}

export function* watchFetchTaskList() {
  yield takeLatest(FETCH_TASK_LIST, fetchTaskList);
}
