import { createActions } from 'redux-actions';

import {
    LOAD_CLIENTS_INDAS,
    LOAD_CLIENTS_INDAS_SUCCESS,
    LOAD_CLIENTS_INDAS_FAILED,
    LOAD_ENTITIES_INDAS,
    LOAD_ENTITIES_INDAS_FAILED,
    LOAD_ENTITIES_INDAS_SUCCESS,
    LOAD_WHOLESALERS_INDAS,
    LOAD_WHOLESALERS_INDAS_FAILED,
    LOAD_WHOLESALERS_INDAS_SUCCESS
} from './actionTypes';

export const {
    loadClientsIndas,
    loadClientsIndasFailed,
    loadClientsIndasSuccess,
    loadEntitiesIndas,
    loadEntitiesIndasFailed,
    loadEntitiesIndasSuccess,
    loadWholesalersIndas,
    loadWholesalersIndasFailed,
    loadWholesalersIndasSuccess
} = createActions(
    LOAD_CLIENTS_INDAS,
    LOAD_CLIENTS_INDAS_FAILED,
    LOAD_CLIENTS_INDAS_SUCCESS,
    LOAD_ENTITIES_INDAS,
    LOAD_ENTITIES_INDAS_FAILED,
    LOAD_ENTITIES_INDAS_SUCCESS,
    LOAD_WHOLESALERS_INDAS,
    LOAD_WHOLESALERS_INDAS_FAILED,
    LOAD_WHOLESALERS_INDAS_SUCCESS
);