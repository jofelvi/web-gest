import { handleActions } from 'redux-actions';
import {
    loadClientsIndasSuccess,
    loadEntitiesIndasSuccess,
    loadWholesalersIndasSuccess,
    setCurrentClientEmail,
} from './actions';

const defaultState = {
    list: [],
    entitiesIndas: [],
    wholesalersIndas: [],
    currentEmail: '',
};
export default handleActions({
    [loadClientsIndasSuccess]:(state,{ payload }) => ({
        ...state,
        list: payload.list
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