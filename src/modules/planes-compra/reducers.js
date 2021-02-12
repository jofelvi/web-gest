import { handleActions } from 'redux-actions';
import { map, filter } from 'underscore';
import { message } from 'antd';
import _ from 'underscore';
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
    fetchSubmarcaCollectionsSuccess,
    fetchSubmarcaCollectionsFailed,
    fetchSubmarcaCollectionsLoading,
    createSubmarcaCollectionSuccess,
    createSubmarcaCollectionFailed,
    createSubmarcaCollectionSetLoading,
    updatePlanSuccess,
    updatePlanFailed,
    fetchPlanSuccess,
    fetchPlanFailed,
    updatePlansSuccess,
} from './actions';

const defaultState = {
    plan: null,
    list: [],
    delegados: [],
    loadingPagination: false,
    loadingList: false,
    loadingTable: false,
    count: 0,
    delegadosComerciales: [
        { id: 1, nombre: 'Paco Delegadillo' },
        { id: 2, nombre: 'Ramon Comercial' },
    ],
    createLoading: false,
    createError: false,

    loadingSubmarcaCollectionList:      false,
    submarcaCollections:                [ ],
    loadingSubmarcaCollectionCreate:    false,
    submarcaCollection:                 [ ],
};

export default handleActions(
    {
        [fetchPlansSuccess]: (state, { payload }) => {
            return ({
                ...state,
                loadingList: false,
                plan: null,
                list: payload.plans
            })
        },
        [fetchPlansCountSuccess]: (state, { payload }) => ({
            ...state,
            count: payload.count,
            loadingPagination: false,
            plan: null,
            loadingTable: state.loadingList,
        }),
        [fetchPlansLoading]: (state, loading) => {
            return {
                ...state,
                loadingList: loading,
                loadingPagination: loading,
                loadingTable: loading,
                plan: null,
            }
        },
        [fetchPlansFailed]: (state, loading) => {
            return {
                ...state,
                loadingList: false,
                loadingTable: state.loadingPagination,
                list: [],
                plan: null,
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
                plan: null,
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

        [fetchSubmarcaCollectionsSuccess]: (state, { payload }) => {
            return ({
                ...state,
                loadingSubmarcaCollectionList: false,
                submarcaCollection: null,
                submarcaCollections: payload.submarcaCollections
            })
        },
        [fetchSubmarcaCollectionsLoading]: (state, { payload }) => {
            return {
                ...state,
                loadingSubmarcaCollectionList: payload.loading,
                submarcaCollections: [],
            }
        },
        [fetchSubmarcaCollectionsFailed]: (state, loading) => {
            return {
                ...state,
                loadingSubmarcaCollectionList: false,
                submarcaCollections: [],
            }
        },
        [createSubmarcaCollectionSetLoading]: (state, { payload } ) => {
            return {
                ...state,
                loadingSubmarcaCollectionCreate: payload.loading,
            }
        },
        [createSubmarcaCollectionSuccess]: (state, { payload }) => {
            return {
                ...state,
                submarcaCollection: payload.submarcaCollection,
                errorSubmarcaCollectionCreate: false,
                loadingSubmarcaCollectionCreate: false,
            }
        },
        [createSubmarcaCollectionFailed]: (state, {  }) => {
            return {
                ...state,
                submarcaCollection: null,
                loadingSubmarcaCollectionCreate: false,
                errorSubmarcaCollectionCreate: true
            }
        },
        [fetchPlanSuccess]: (state, { payload }) => {
            return {
                ...state,
                plan: payload.plan,
                createError: false,
            }
        },
        [updatePlansSuccess]: (state, { payload }) => {
            const list = state.list.map( (plan) => {
                const changedPlan = _.find( payload.plans, ( changedPlan ) => (changedPlan.idcondcomercial==plan.idcondcomercial))
                return changedPlan ? changedPlan : plan
            } )
            return {
                ...state,
                list: list
            }
        }
    },
    defaultState
);
