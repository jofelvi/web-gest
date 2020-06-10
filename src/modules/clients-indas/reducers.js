import { handleActions } from 'redux-actions';
import { NUM_CLIENTES_PAG } from './constants';

import {
    loadClientsIndasSuccess,
    loadEntitiesIndasSuccess,
    loadWholesalersIndasSuccess,
    setCurrentClientEmail,
    loadClientsIndas,
    getUsersCountSuccess,
    loadClientsIndasFailed
} from './actions';

const defaultState = {
    list: [],
    entitiesIndas: [],
    wholesalersIndas: [],
    currentEmail: '',
    usersMeta: {
        page: 1,
        pageSize: NUM_CLIENTES_PAG,
        total: 0,
        emailComo: '',
        searchLoading: false,
    },
};
export default handleActions({
    [loadClientsIndasSuccess]:(state,{ payload }) => ({
        ...state,
        list: payload.list,
        usersMeta: {
            ...state.usersMeta,
            ...payload.userMeta,
            searchLoading: false,
        }
    }),
    [loadClientsIndasFailed]: (state)=>({
        ...state,
        usersMeta: {
          ...state.usersMeta,
          searchLoading: false,
        }
      }),
    [loadClientsIndas]:(state) => ({
        ...state,
        usersMeta: {
            ...state.usersMeta,
            searchLoading: true,
        }
    }),
    [getUsersCountSuccess]: (state, { payload })=>({
        ...state,
        usersMeta: {
          ...state.usersMeta,
          total: payload.count,
        }
    }),
    [loadEntitiesIndasSuccess]:(state,{ payload }) => ({
        ...state,
        entitiesIndas: payload.entitiesIndas
    }),
    [loadWholesalersIndasSuccess]:(state,{ payload }) => ({
        ...state,
        wholesalersIndas: payload.wholesalersIndas
    }),
    [setCurrentClientEmail]:(state,{ payload }) => ({
        ...state,
        currentEmail: payload.currentEmail
    })
    
},defaultState);