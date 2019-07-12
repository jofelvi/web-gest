import { takeLatest, call, put, select } from 'redux-saga/effects';

import {
  startProcessFailed,
  startProcessSuccess,
  continueProcess as nextProcess,
  continueProcessSuccess,
  startProcess,
  completeTaskSuccess,
  getTaskVariablesFailed,
  getTaskVariablesSuccess,
  setComplete,
  getTaskForm as fetchTaskForm,
  getTaskFormSuccess,
  getTaskFormFailed,
  setProcId,
} from './actions';

import {
  START_PROCESS,
  CONTINUE_PROCESS,
  COMPLETE_TASK,
  GET_TASK_VARIABLES,
  GET_TASK_FORM,
} from './actionTypes';

import * as api from './api';
import { login } from '../auth/actions';
import utils from '../../lib/utils';

function* startProcessSaga({ payload }) {
  try {
    yield put(setComplete(false));
    const response = yield call(api.startProcess, payload.key);
    if (response.data !== null) {
      yield put(
        startProcessSuccess({
          key: payload.key,
          taskName: response.data,
          process: payload.key,
        })
      );
    } else {
      yield put(nextProcess({ variables: [] }));
    }
  } catch (e) {
    console.error(e);
    yield put(startProcessFailed());
    const user = process.env.REACT_APP_ANONYM_USER;
    const password = process.env.REACT_APP_ANONYM_PASSWORD;
    console.warn('login with anonym user');
    yield put(
      login({
        values: { user, password },
        nextAction: startProcess,
        nextActionPayload: payload,
      })
    );
  }
}

export function* watchStartProcess() {
  yield takeLatest(START_PROCESS, startProcessSaga);
}

function* continueProcess({ payload }) {
  const processKey = yield select(state => state.forms.processKey);
  let response = yield call(api.continueProcess, processKey, payload.variables);
  const procId = response.data;
  yield put(setProcId(procId));
  response = yield call(api.checkTask, procId);

  if (response.status === 200) {
    const newTaskName = response.data.formKey;
    utils.setTaskId(response.data.taskId);
    yield put(
      continueProcessSuccess({
        taskName: newTaskName,
        taskId: response.data.taskId,
      })
    );
    window.history.pushState(
      null,
      null,
      `/process/${processKey}/${response.data.formKey}`
    );
  } else if (response.status === 401) {
    window.history.pushState(null, null, '/login');
  } else {
    console.log('---> completed');
  }
}

export function* watchContinueProcess() {
  yield takeLatest(CONTINUE_PROCESS, continueProcess);
}

function* completeTaskProcess({ payload }) {
  yield put(setComplete(true));
  let procId = yield select(state =>
    state.tasks.selectedTask
      ? state.tasks.selectedTask.processDefinitionId.split(':')[2]
      : state.forms.procId
  );
  const processKey = yield select(state =>
    state.tasks.selectedTask
      ? state.tasks.selectedTask.processDefinitionId.split(':')[0]
      : state.forms.processKey
  );
  const taskId = yield select(state =>
    state.tasks.selectedTask ? state.tasks.selectedTask.id : state.forms.taskId
  );
  let response;
  if (taskId) {
    response = yield call(api.completeTask, taskId, payload.variables);
  } else {
    response = yield call(api.continueProcess, processKey, payload.variables);
  }
  procId = response.data ? response.data : procId;
  yield put(setProcId(procId));
  response = yield call(api.checkTask, procId);
  console.log({ responseNext: response });
  if (response.status === 200) {
    const newTaskName = response.data.formKey;

    yield put(
      completeTaskSuccess({
        taskName: newTaskName,
        taskId: response.data.taskId,
      })
    );
    payload.history.push(`/process/${processKey}/${response.data.formKey}`);
  } else if (response.status === 401) {
    payload.history.push('/login');
  } else {
    console.log('--> completed');
    yield put(setComplete(true));
    payload.history.push(`/task/completed`);
  }
}

export function* watchCompleteTaskProcess() {
  yield takeLatest(COMPLETE_TASK, completeTaskProcess);
}

function* getTaskForm({ payload }) {
  try {
    const response = yield call(api.getTaskForm, payload.taskId);
    if (response.status === 200) {
      yield put(getTaskFormSuccess({ taskName: response.data }));
    }
  } catch (e) {
    console.error(e);
    yield put(getTaskFormFailed());
    const user = process.env.REACT_APP_ANONYM_USER;
    const password = process.env.REACT_APP_ANONYM_PASSWORD;
    console.warn('login with anonym user');
    yield put(
      login({
        values: { user, password },
        nextAction: fetchTaskForm,
        nextActionPayload: payload,
      })
    );
  }
}

export function* watchGetTaskForm() {
  yield takeLatest(GET_TASK_FORM, getTaskForm);
}

function* getTaskVariables() {
  try {
    const taskId = yield select(state =>
      state.tasks.selectedTask
        ? state.tasks.selectedTask.id
        : state.forms.taskId
    );
    const response = yield call(api.getTaskVariables, taskId);
    yield put(getTaskVariablesSuccess(response.data));
  } catch (e) {
    console.error(e);
    yield put(getTaskVariablesFailed());
  }
}

export function* watchGetTaskVariables() {
  yield takeLatest(GET_TASK_VARIABLES, getTaskVariables);
}
