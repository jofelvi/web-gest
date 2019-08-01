import { handleActions } from 'redux-actions';

import {
  loadMenuItemsSuccess,
  selectParentItem,
  loadChildItemsMenuSuccess
} from './actions';

const defaultState = {
  itemsMenu:[],
  childItemsMenu:[],
  parentItem: {}
};

export default handleActions(
  {
    [loadMenuItemsSuccess]: (state, { payload })=>({
      ...state,
      itemsMenu: payload.MenuItems
    }),
    [selectParentItem]: (state, { payload })=>({
      ...state,
      parentItem: payload
    }),
    [loadChildItemsMenuSuccess]: (state, { payload })=>({
      ...state,
      childItemsMenu: payload.ChildItems
    }),
  },
  defaultState
);
