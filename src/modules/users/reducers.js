import { handleActions } from 'redux-actions';

import { fetchUsersSuccess, fetchUserByIdSuccess } from './actions';

const defaultState = {
  list: []
};

export default handleActions(
  {
    [fetchUsersSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.users
    }),
    [fetchUserByIdSuccess]: (state, { payload }) => ({
      ...state,
      byId: payload.user
    })
  },
  defaultState
);
