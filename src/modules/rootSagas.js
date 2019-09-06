import { all } from 'redux-saga/effects';

import { watchFetchUsers, watchFetchUserById } from './users/sagas';

import {
  watchFetchTasks,
  watchFetchTask,
  watchFetchTasksCount,
  watchFetchTasksByUser,
  watchFetchTaskList,
  watchFetchTaskForm
} from './tasks/sagas';

import {
  watchRefreshToken,
  watchLogin,
  watchLogout,
  watchCheckLogin
} from './auth/sagas';

import {
  watchStartProcess,
  watchGetTaskVariables,
  watchContinueProcess,
  watchCompleteTaskProcess,
  watchGetTaskForm
} from './forms/sagas';

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchFetchUserById(),
    watchFetchTasks(),
    watchFetchTask(),
    watchFetchTasksCount(),
    watchFetchTasksByUser(),
    watchFetchTaskForm(),
    watchFetchTaskList(),
    watchRefreshToken(),
    watchCheckLogin(),
    watchLogin(),
    watchLogout(),
    watchStartProcess(),
    watchGetTaskForm(),
    watchGetTaskVariables(),
    watchContinueProcess(),
    watchCompleteTaskProcess()
  ]);
}
