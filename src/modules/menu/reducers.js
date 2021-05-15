import { handleActions } from 'redux-actions';

import {
  loadMenuItemsSuccess,
  selectParentItem,
  loadChildItemsMenuSuccess,
  setCollapse,
    setSelectedKeys,
    setOpenKeys,
} from './actions';

const defaultState = {
  itemsMenu:[],
  selectedKeys: [],
    openKeys: [],
  childItemsMenu:[],
  parentItem: {},
  collapsed: false,
  wMenu:4,
  wContent:20
};

export default handleActions(
  {
      [setSelectedKeys]: ( state, { payload } ) => {
          console.log( 'setSelectedKeys', payload.selectedKeys );
          return ({
          ...state,
          selectedKeys: payload.selectedKeys
      }) } ,

      [setOpenKeys]: ( state, { payload } ) => {
          console.log( 'setOpenKeys', payload );
          return ({
              ...state,
              openKeys: payload
          }) } ,
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
