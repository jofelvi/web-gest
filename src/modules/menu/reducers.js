import { handleActions } from 'redux-actions';

import {
  loadMenuItemsSuccess,
  selectParentItem,
  loadChildItemsMenuSuccess,
  setCollapse
} from './actions';

const defaultState = {
  itemsMenu:[],
  childItemsMenu:[],
  parentItem: {},
  collapsed: false,
  wMenu:4,
  wContent:20
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
    [setCollapse]:(state,{payload}) =>({
      ...state,
      collapsed: payload,
      wMenu: payload ? 1: 4,
      wContent: payload ? 23: 20
    })
  },
  defaultState
);
