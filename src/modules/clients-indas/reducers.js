import { handleActions } from 'redux-actions';
import { NUM_CLIENTES_PAG } from './constants';

import {
    loadClientsIndasSuccess,
    loadEntitiesIndasSuccess,
    loadWholesalersIndasSuccess,
    setCurrentClientEmail,
    loadClientsIndas,
    getClientsCountFailed,
	getClientsCountSuccess,
    loadClientsIndasFailed,
    setFilterValues,
    setFormKey,
    editClientIndasSuccess,
} from './actions';
import { generateKey } from '../utils';
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
    filterValues: {
        emailComo: '',
        nombreComo: '',
        codcli_cbim: '',
    },
    formKey: generateKey(),
    isEdited: false,
};
export default handleActions({
    [loadClientsIndasSuccess]:(state,{ payload }) => ({
        ...state,
        list: payload.list,
        isEdited: false,
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
    [editClientIndasSuccess]: (state)=> ({
        ...state,
        list: state.list,
        isEdited: true,
    }),
    [loadClientsIndas]:(state) => ({
        ...state,
        usersMeta: {
            ...state.usersMeta,
            searchLoading: true,
        }
    }),
    [getClientsCountSuccess]: (state, { payload })=>({
        ...state,
        usersMeta: {
          ...state.usersMeta,
          total: payload ? payload.count : '',
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
    }),
    [setFilterValues]:  (state, { payload}) => {
        const { emailComo, nombreComo, codcli_cbim } = payload;
        return ({
        ...state,
        filterValues: {
            emailComo: payload ?  emailComo : '',
            nombreComo: payload ? nombreComo : '',
            codcli_cbim: payload ?codcli_cbim : '',
        }
      })
    },
    [setFormKey]:  (state) => ({
        ...state,
        formKey: generateKey() 
    }),
    
},defaultState);