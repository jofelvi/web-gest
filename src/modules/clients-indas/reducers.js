import { handleActions } from 'redux-actions';
import {
    loadClientsIndasSuccess,
    loadEntitiesIndasSuccess,
    loadWholesalersIndasSuccess
} from './actions';

const defaultState = {
    list: [],
    entitiesIndas: [],
    wholesalersIndas: []
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
    })
},defaultState);