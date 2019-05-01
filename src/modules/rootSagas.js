import { all } from 'redux-saga/effects';

import { watchFetchUsers, watchFetchUserById } from './users/sagas';

import {
  watchFetchTasks,
  watchFetchTasksCount,
  watchFetchTasksByUser
} from './tasks/sagas';

import { watchRefreshToken, watchLogin, watchLogout } from './auth/sagas';

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchFetchUserById(),
    watchFetchTasks(),
    watchFetchTasksCount(),
    watchFetchTasksByUser(),
    watchRefreshToken(),
    watchLogin(),
    watchLogout()
  ]);
}
