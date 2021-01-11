import { handleActions } from 'redux-actions';
import { map, filter } from 'underscore';
import { message } from 'antd';

import {
    fetchPlansSuccess,
    fetchPlansFailed,
    fetchPlansLoading,
} from './actions';

const defaultState = {
    list: [],
    loadingList: false,
    count: 0,
    delegadosComerciales: [
        { id: 1, nombre: 'Paco Delegadillo' },
        { id: 2, nombre: 'Ramon Comercial' },
    ]
};

export default handleActions(
    {
        [fetchPlansSuccess]: (state, { payload }) => {
            return ({
                ...state,
                loadingList: false,
                list: payload.plans
            })
        },
        [fetchPlansLoading]: (state, loading) => {
            return {
                ...state,
                loadingList: loading
            }
        },
        [fetchPlansFailed]: (state, loading) => {
            return {
                ...state,
                loadingList: false,
                list: [],
                count: 0
            }
        },
    },
    defaultState
);
