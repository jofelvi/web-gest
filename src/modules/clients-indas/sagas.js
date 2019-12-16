import { takeLatest, put, call } from 'redux-saga/effects';

import {
    LOAD_CLIENTS_INDAS,
    LOAD_ENTITIES_INDAS,
    LOAD_WHOLESALERS_INDAS
} from './actionTypes';
import {
    loadClientsIndasFailed,
    loadClientsIndasSuccess,
    loadEntitiesIndasFailed,
    loadEntitiesIndasSuccess,
    loadWholesalersIndasFailed,
    loadWholesalersIndasSuccess
} from './actions';
import * as api from './api';

//clients indas
function* loadClientsIndas() {
    try {
      const response = yield call(api.getClientsIndas);
      yield put(loadClientsIndasSuccess({ list: response.data }));
    } catch (e) {
      console.error(e);
      yield put(loadClientsIndasFailed());
    }
  }
  
  export function* watchloadClientsIndas() {
    yield takeLatest(LOAD_CLIENTS_INDAS, loadClientsIndas);
  }

  //entities indas
  function* loadEntitiesIndas() {
    try {
      const response = yield call(api.getEntitiesIndas);
      yield put(loadEntitiesIndasSuccess({ entitiesIndas: response.data }));
    } catch (e) {
      console.error(e);
      yield put(loadEntitiesIndasFailed());
    }
  }
  
  export function* watchloadEntitiesInda() {
    yield takeLatest(LOAD_ENTITIES_INDAS, loadEntitiesIndas);
  }

  //wholesalers indas
  function* loadWholesalersIndas(idEntity) {
    try {
      const response = yield call(api.getWholesalersIndas,idEntity.payload);
      yield put(loadWholesalersIndasSuccess({ wholesalersIndas: response.data }));
    } catch (e) {
      console.error(e);
      yield put(loadWholesalersIndasFailed());
    }
  }
  
  export function* watchloadWholesalersIndas() {
    yield takeLatest(LOAD_WHOLESALERS_INDAS, loadWholesalersIndas);
  }
