import { takeLatest, put, call } from 'redux-saga/effects';

import { 
  LOAD_MENU_ITEMS,
  LOAD_CHILD_ITEMS_MENU
} from './actionTypes';
import {
  loadMenuItemsSuccess,
  loadMenuItemsFailed,
  loadChildItemsMenuSuccess,
  loadChildItemsMenuFailed
} from './actions';

import * as api from './api';

function* loadMenuItems() {
  try {
    const response = yield call(api.getMenuItems);
    yield put(loadMenuItemsSuccess({ MenuItems: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadMenuItemsFailed());
  }
}

export function* watchloadMenuItems() {
  yield takeLatest(LOAD_MENU_ITEMS, loadMenuItems);
}

function* loadChildItemsMenu({payload}){
  try{
    const response = yield call(api.getChildItems, payload);
    yield put(loadChildItemsMenuSuccess({ ChildItems: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadChildItemsMenuFailed());
  }
}
export function* watchloadChildItems(){
  yield takeLatest(LOAD_CHILD_ITEMS_MENU, loadChildItemsMenu)
}



