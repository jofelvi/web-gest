import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  fetchTasksSuccess,
  fetchTasksFailed,
  fetchTasksCountSuccess,
  fetchTasksCountFailed,
  fetchTasksByUserSuccess,
  fetchTasksByUserFailed,
  fetchTaskListSuccess,
  fetchTaskListFailed,
} from './actions';

import { getTaskFormSuccess, getTaskFormFailed } from '../forms/actions';

import {
  FETCH_TASKS,
  FETCH_TASKS_COUNT,
  FETCH_TASKS_BY_USER,
  FETCH_TASK_LIST,
  FETCH_TASK_FORM,
} from './actionTypes';

import * as api from './api';

function* fetchTasks({ payload }) {
  try {
    const response = yield call(api.fetchTasks);

    if (response.status === 401) {
      payload.history.push('/login');
    }

    yield put(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchTasksFailed());
  }
}

export function* watchFetchTasks() {
  yield takeLatest(FETCH_TASKS, fetchTasks);
}

function* fetchTasksCount({ payload }) {
  try {
    const response = yield call(api.fetchTasksCount);

    if (response.status === 401) {
      payload.history.push('/login');
    }

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

    if (response.status === 401) {
      payload.history.push('/login');
    }

    yield put(fetchTasksByUserSuccess({ tasksByUser: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchTasksByUserFailed());
  }
}

export function* watchFetchTasksByUser() {
  yield takeLatest(FETCH_TASKS_BY_USER, fetchTasksByUser);
}

function* fetchTaskForm({ payload }) {
  try {
    const response = yield call(api.fetchTaskForm, payload.taskId);

    if (response.status === 401) {
      payload.history.push('/login');
    }

    yield put(getTaskFormSuccess({ taskName: response.data }));
  } catch (e) {
    console.error(e);
    yield put(getTaskFormFailed());
  }
}

export function* watchFetchTaskForm() {
  yield takeLatest(FETCH_TASK_FORM, fetchTaskForm);
}

function* fetchTaskList({ payload }) {
  try {
    const sortBy = yield select(state => state.tasks.sortBy);
    const taskListType = payload.type;
    const sortOrder = payload.sortOrder;

    switch (taskListType) {
      case 'user':
        const userResponse = yield call(
          api.fetchUserTaskList,
          sortBy,
          sortOrder
        );

        if (userResponse.status === 401) {
          payload.history.push('/login');
        }

        yield put(fetchTaskListSuccess(userResponse.data));
        break;
      case 'group':
        const groupResponse = yield call(
          api.fetchGroupTaskList,
          sortBy,
          sortOrder
        );

        if (groupResponse.status === 401) {
          payload.history.push('/login');
        }

        yield put(fetchTaskListSuccess(groupResponse.data));
        break;
      case 'all':
        const response = yield call(api.fetchTaskList, sortBy, sortOrder);

        if (response.status === 401) {
          payload.history.push('/login');
        }

        yield put(fetchTaskListSuccess(response.data));
        break;
      default:
        const defaultResponse = yield call(
          api.fetchTaskList,
          sortBy,
          sortOrder
        );

        if (defaultResponse.status === 401) {
          payload.history.push('/login');
        }

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
