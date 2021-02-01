import { handleActions } from 'redux-actions';
import { map, filter } from 'underscore';
import { message } from 'antd';

import {
    fetchPlansSuccess,
    fetchPlansCountSuccess,
    fetchPlansFailed,
    fetchPlansLoading,
    createPlanSuccess,
    createPlanFailed,
    createPlanSetLoading,
    fetchDelegadosSuccess,
    fetchDelegadosFailed,
} from './actions';
import {fetchOrdersCountSuccess} from "../orders/actions";

const defaultState = {
    list: [],
    delegados: [],
    loadingList: false,
    count: 0,
    delegadosComerciales: [
        { id: 1, nombre: 'Paco Delegadillo' },
        { id: 2, nombre: 'Ramon Comercial' },
    ],
    createLoading: false,
    createError: false,
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
        [fetchPlansCountSuccess]: (state, { payload }) => ({
            ...state,
            count: payload.count
        }),
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
        [createPlanSetLoading]: (state, { payload } ) => {
            return {
                ...state,
                createLoading: payload.loading,
                createError: false,
            }
        },
        [createPlanSuccess]: (state, { payload }) => {
            return {
                ...state,
                plan: payload.plan,
                createError: false,
                createLoading: false,
            }
        },
        [createPlanFailed]: (state, {  }) => {
            return {
                ...state,
                plan: false,
                createLoading: false,
                createError: true
            }
        },

        [fetchDelegadosSuccess]: (state, { payload }) => {
            return ({
                ...state,
                delegados: payload.delegados
            })
        },

        [fetchDelegadosFailed]: (state, {  }) => {
            return ({
                ...state,
                delegados: []
            })
        },
    },
    defaultState
);
