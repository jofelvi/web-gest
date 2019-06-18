import { all } from 'redux-saga/effects';

import { watchFetchUsers, watchFetchUserById } from './users/sagas';

import {
  watchFetchTasks,
  watchFetchTasksCount,
  watchFetchTasksByUser
} from './tasks/sagas';

import { watchRefreshToken, watchLogin, watchLogout, watchCheckLogin } from './auth/sagas';

import {
  watchStartProcess,
  watchGetTaskVariables,
  watchContinueProcess,
  watchCompleteTaskProcess
} from './forms/sagas';

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchFetchUserById(),
    watchFetchTasks(),
    watchFetchTasksCount(),
    watchFetchTasksByUser(),
    watchRefreshToken(),
    watchCheckLogin(),
    watchLogin(),
    watchLogout(),
    watchStartProcess(),
    watchGetTaskVariables(),
    watchContinueProcess(),
    watchCompleteTaskProcess()
  ]);
}
