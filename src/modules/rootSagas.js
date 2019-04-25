import { all } from 'redux-saga/effects';

import { watchFetchUsers, watchFetchUserById } from './users/sagas';

export default function* rootSaga() {
  yield all([watchFetchUsers(), watchFetchUserById()]);
}
