import { createActions } from 'redux-actions';

import {
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_FAILED,
  SELECT_PARENT_ITEM,
  LOAD_CHILD_ITEMS_MENU,
  LOAD_CHILD_ITEMS_MENU_SUCCESS,
  LOAD_CHILD_ITEMS_MENU_FAILED,
  SET_COLLAPSE,
  SET_SELECTED_KEYS,
  SET_OPEN_KEYS,
} from './actionTypes';

export const {
  loadMenuItems,
  loadMenuItemsSuccess,
  loadMenuItemsFailed,
  selectParentItem,
  loadChildItemsMenu,
  loadChildItemsMenuSuccess,
  loadChildItemsMenuFailed,
  setCollapse,
  setSelectedKeys,
  setOpenKeys
} = createActions(
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_FAILED,
  SELECT_PARENT_ITEM,
  LOAD_CHILD_ITEMS_MENU,
  LOAD_CHILD_ITEMS_MENU_SUCCESS,
  LOAD_CHILD_ITEMS_MENU_FAILED,
  SET_COLLAPSE,
  SET_SELECTED_KEYS,
  SET_OPEN_KEYS
);
