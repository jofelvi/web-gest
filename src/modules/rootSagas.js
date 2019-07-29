import { all } from 'redux-saga/effects';

import { watchFetchUsers, watchFetchUserById } from './users/sagas';

import {
  watchFetchTasks,
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

import {
  watchloadCommercialDeals
} from './commercialDeals/sagas'

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchFetchUserById(),
    watchFetchTasks(),
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
    watchCompleteTaskProcess(),
    watchloadCommercialDeals()
  ]);
}
