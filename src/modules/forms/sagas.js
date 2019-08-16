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
  continueProcessFailed,
} from './actions';

import { cleanSelectedTask, setSelectedTaskId } from '../tasks/actions';

import { checkLoginFailed } from '../auth/actions';

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
    const response = yield call(api.startProcess, payload.key);
    yield put(setComplete(false));
    yield put(cleanSelectedTask());

    if (response.data !== null) {
      yield put(
        startProcessSuccess({
          key: payload.key,
          taskName: response.data,
          process: payload.key,
        })
      );
    } else {
      yield put(nextProcess({ variables: [], history: payload.history }));
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
  try {
    let response = yield call(
      api.continueProcess,
      processKey,
      payload.variables
    );
    const procId = response.data;
    yield put(setProcId(procId));
    response = yield call(api.checkTask, procId);

    if (response.status === 200) {
      const newTaskName = response.data.formKey;
      utils.setTaskId(response.data.taskId);
      yield put(setSelectedTaskId(response.data.taskId));
      yield put(
        continueProcessSuccess({
          taskName: newTaskName,
          taskId: response.data.taskId,
        })
      );
      payload.history.push(`/process/${processKey}/${response.data.formKey}`);
    } else {
      console.log('---> completed');
      yield put(setComplete(true));
    }
  } catch (e) {
    console.error(e);

    if (e.message.includes('401')) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
      yield put(continueProcessFailed());
    }

    yield put(continueProcessFailed());
  }
}

export function* watchContinueProcess() {
  yield takeLatest(CONTINUE_PROCESS, continueProcess);
}

function* completeTaskProcess({ payload }) {
  let procId = yield select(state =>
    state.tasks.selectedTask
      ? state.tasks.selectedTask.processInstanceId
      : state.forms.procId
  );

  const processKey = yield select(state =>
    state.tasks.selectedTask
      ? state.tasks.selectedTask.processDefinitionId.split(':')[0]
      : state.forms.processKey
  );
  const taskId = yield select(state =>
    state.forms.taskId
      ? state.forms.taskId
      : state.tasks.selectedTask
      ? state.tasks.selectedTask.id
      : null
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
  if (response.status === 200) {
    const newTaskName = response.data.formKey;
    const selectedTask = yield select(state => state.tasks.selectedTask);
    if (selectedTask) {
      yield put(setSelectedTaskId(response.data.taskId));
    }
    yield put(
      completeTaskSuccess({
        taskName: newTaskName,
        taskId: response.data.taskId,
      })
    );
    payload.history.push(`/task/${response.data.taskId}/process/${procId}`);
  } else if (response.status === 401) {
    utils.removeAuthToken();
    yield put(checkLoginFailed());
    payload.history.push('/login');
  } else {
    console.log('--> completed');
    yield put(setComplete(true));
    yield put(cleanSelectedTask());
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
    } else if (response.status === 401) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
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

function* getTaskVariables({ payload }) {
  try {
    const taskId = yield select(state =>
      state.tasks.selectedTask
        ? state.tasks.selectedTask.id
        : state.forms.taskId
    );
    const response = yield call(api.getTaskVariables, taskId);

    yield put(getTaskVariablesSuccess({ taskVariables: response.data }));
  } catch (e) {
    console.error(e);

    if (e.message.includes('401')) {
      utils.removeAuthToken();
      yield put(checkLoginFailed());
      payload.history.push('/login');
      yield put(getTaskVariablesFailed());
    }

    yield put(getTaskVariablesFailed());
  }
}

export function* watchGetTaskVariables() {
  yield takeLatest(GET_TASK_VARIABLES, getTaskVariables);
}
