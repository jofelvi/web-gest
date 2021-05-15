import { createActions } from 'redux-actions';

import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_USER_BY_ID,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_FAILED
} from './actionTypes';

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailed,
  fetchUserById,
  fetchUserByIdSuccess,
  fetchUserByIdFailed
} = createActions(
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_USER_BY_ID,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_FAILED
);
