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
} from './actions';
import {fetchOrdersCountSuccess} from "../orders/actions";

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
        [createPlanSetLoading]: (state, loading ) => {
            return {
                ...state,
                loadingCreate: loading,
            }
        },
        [createPlanSuccess]: (state, { plan }) => {
            return {
                ...state,
                plan: plan,
                loadingCreate: false,
            }
        },
        [createPlanFailed]: (state, {  }) => {
            return {
                ...state,
                plan: false,
                loadingCreate: false,
            }
        },
    },
    defaultState
);
