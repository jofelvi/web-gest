import { createActions } from 'redux-actions';

import {
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_FAILED,
  SELECT_PARENT_ITEM,
  LOAD_CHILD_ITEMS_MENU,
  LOAD_CHILD_ITEMS_MENU_SUCCESS,
  LOAD_CHILD_ITEMS_MENU_FAILED
} from './actionTypes';

export const {
  loadMenuItems,
  loadMenuItemsSuccess,
  loadMenuItemsFailed,
  selectParentItem,
  loadChildItemsMenu,
  loadChildItemsMenuSuccess,
  loadChildItemsMenuFailed
} = createActions(
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_FAILED,
  SELECT_PARENT_ITEM,
  LOAD_CHILD_ITEMS_MENU,
  LOAD_CHILD_ITEMS_MENU_SUCCESS,
  LOAD_CHILD_ITEMS_MENU_FAILED
);
