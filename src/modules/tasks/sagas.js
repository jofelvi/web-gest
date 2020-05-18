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
  fetchTaskSuccess,
  fetchTaskFailed,
  editTaskSuccess,
  fetchTaskMessageSuccess,
  fetchTaskAssigneeUserSuccess,
} from './actions';

import { getTaskFormSuccess, getTaskFormFailed } from '../forms/actions';

import { checkLoginFailed } from '../auth/actions';

import {
  FETCH_TASKS,
  FETCH_TASKS_COUNT,
  FETCH_TASKS_BY_USER,
  FETCH_TASK_LIST,
  FETCH_TASK_FORM,
  FETCH_TASK,
  EDIT_TASK,
  EDIT_TASK_MESSAGE,
  FETCH_TASK_MESSAGE,
  FETCH_TASK_ASSIGNEE_USER,
} from './actionTypes';

import utils from '../../lib/utils';

import * as api from './api';

function* fetchTasks({ payload }) {
  try {
    const response = yield call(api.fetchTasks);

    yield put(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    console.error(e);

    if (e.message.includes('401')) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
      yield put(fetchTaskListFailed());
    }

    yield put(fetchTasksFailed());
  }
}

export function* watchFetchTasks() {
  yield takeLatest(FETCH_TASKS, fetchTasks);
}

function* fetchTask({ payload }) {
  try {
    const response = yield call(api.fetchTask, payload);

    yield put(fetchTaskSuccess(response.data));
  } catch (e) {
    console.error(e);

    yield put(fetchTaskFailed());
  }
}

export function* watchFetchTask() {
  yield takeLatest(FETCH_TASK, fetchTask);
}

function* fetchTasksCount({ payload }) {
  try {
    const response = yield call(api.fetchTasksCount);

    yield put(fetchTasksCountSuccess({ tasksCount: response.data }));
  } catch (e) {
    console.error(e);

    if (e.message.includes('401')) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
      yield put(fetchTaskListFailed());
    }

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

    if (e.message.includes('401')) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
      yield put(fetchTaskListFailed());
    }

    yield put(fetchTasksByUserFailed());
  }
}

export function* watchFetchTasksByUser() {
  yield takeLatest(FETCH_TASKS_BY_USER, fetchTasksByUser);
}

function* fetchTaskForm({ payload }) {
  try {
    const response = yield call(api.fetchTaskForm, payload.taskId);

    yield put(getTaskFormSuccess({ taskName: response.data }));
  } catch (e) {
    console.error(e);

    if (e.message.includes('401')) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
      yield put(fetchTaskListFailed());
    }

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

        yield put(fetchTaskListSuccess(userResponse.data));
        break;
      case 'group':
        const groupResponse = yield call(
          api.fetchGroupTaskList,
          sortBy,
          sortOrder
        );

        yield put(fetchTaskListSuccess(groupResponse.data));
        break;
      case 'all':
        const response = yield call(api.fetchTaskList, sortBy, sortOrder);

        yield put(fetchTaskListSuccess(response.data));
        break;
      default:
        const defaultResponse = yield call(
          api.fetchTaskList,
          sortBy,
          sortOrder
        );

        yield put(fetchTaskListSuccess(defaultResponse.data));
    }
  } catch (e) {
    console.error(e);

    if (e.message.includes('401')) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
      yield put(fetchTaskListFailed());
    }

    yield put(fetchTaskListFailed());
  }
}

export function* watchFetchTaskList() {
  yield takeLatest(FETCH_TASK_LIST, fetchTaskList);
}

function* editTask({ payload }) {
  try {
    const response = yield call(api.editTask, payload.id, payload.values);
    
    yield put(editTaskSuccess(payload));

  }catch (e) {
    console.error(e);
  }
}

export function* watchEditTask() {
  yield takeLatest(EDIT_TASK, editTask);
}

function* editTaskMessage({ payload }) {
  try {
    const response = yield call(api.editTaskMessage, payload.id, payload.values);

  }catch (e) {
    console.error(e);
  }
}

export function* watchEditTaskMessage() {
  yield takeLatest(EDIT_TASK_MESSAGE, editTaskMessage);
}

function* fetchTaskMessage({ payload }) {
  try {
    const response = yield call(api.fetchTaskMessage, payload.id);
    yield put(fetchTaskMessageSuccess({taskMessage: response.data}))

  }catch (e) {
    console.error(e);
  }
}

export function* watchFetchTaskMessage() {
  yield takeLatest(FETCH_TASK_MESSAGE, fetchTaskMessage);
}

function* fetchTaskAssigneeUser({ payload }) {
  try {
    const response = yield call(api.fetchTaskAssigneeUser);
  yield put(fetchTaskAssigneeUserSuccess({usersAsignee: response.data}));

  }catch (e) {
    console.error(e);
  }
}

export function* watchFetchTaskAssigneeUser() {
  yield takeLatest(FETCH_TASK_ASSIGNEE_USER, fetchTaskAssigneeUser);
}