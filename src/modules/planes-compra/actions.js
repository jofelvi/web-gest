import { createActions } from 'redux-actions';

import {
    FETCH_PLANS,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_COUNT_SUCCESS,
    FETCH_PLANS_FAILED,
    FETCH_PLANS_LOADING,
    CREATE_PLAN,
    CREATE_PLAN_SUCCESS,
    CREATE_PLAN_FAILED,
    CREATE_PLAN_SET_LOADING,
    FETCH_DELEGADOS,
    FETCH_DELEGADOS_SUCCESS,
    FETCH_DELEGADOS_FAILED,
    FETCH_SUBMARCA_COLLECTIONS,
    FETCH_SUBMARCA_COLLECTIONS_SUCCESS,
    FETCH_SUBMARCA_COLLECTIONS_FAILED,
    FETCH_SUBMARCA_COLLECTIONS_LOADING,
    CREATE_SUBMARCA_COLLECTION,
    CREATE_SUBMARCA_COLLECTION_SUCCESS,
    CREATE_SUBMARCA_COLLECTION_FAILED,
    CREATE_SUBMARCA_COLLECTION_SET_LOADING,
    UPDATE_PLAN,
    UPDATE_PLAN_SUCCESS,
    UPDATE_PLAN_FAILED,
    FETCH_PLAN,
    FETCH_PLAN_SUCCESS,
    FETCH_PLAN_FAILED,
    UPDATE_PLANS,
    UPDATE_PLANS_SUCCESS,
} from './actionTypes';

export const {
    fetchPlans,
    fetchPlansSuccess,
    fetchPlansCountSuccess,
    fetchPlansFailed,
    fetchPlansLoading,
    createPlan,
    createPlanSuccess,
    createPlanFailed,
    createPlanSetLoading,
    fetchDelegados,
    fetchDelegadosSuccess,
    fetchDelegadosFailed,
    fetchSubmarcaCollections,
    fetchSubmarcaCollectionsSuccess,
    fetchSubmarcaCollectionsFailed,
    fetchSubmarcaCollectionsLoading,
    createSubmarcaCollection,
    createSubmarcaCollectionSuccess,
    createSubmarcaCollectionFailed,
    createSubmarcaCollectionSetLoading,
    updatePlan,
    updatePlanSuccess,
    updatePlanFailed,
    fetchPlan,
    fetchPlanSuccess,
    fetchPlanFailed,
    updatePlans,
    updatePlansSuccess
} = createActions(
    FETCH_PLANS,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_COUNT_SUCCESS,
    FETCH_PLANS_FAILED,
    FETCH_PLANS_LOADING,
    CREATE_PLAN,
    CREATE_PLAN_SUCCESS,
    CREATE_PLAN_FAILED,
    CREATE_PLAN_SET_LOADING,
    FETCH_DELEGADOS,
    FETCH_DELEGADOS_SUCCESS,
    FETCH_DELEGADOS_FAILED,
    FETCH_SUBMARCA_COLLECTIONS,
    FETCH_SUBMARCA_COLLECTIONS_SUCCESS,
    FETCH_SUBMARCA_COLLECTIONS_FAILED,
    FETCH_SUBMARCA_COLLECTIONS_LOADING,
    CREATE_SUBMARCA_COLLECTION,
    CREATE_SUBMARCA_COLLECTION_SUCCESS,
    CREATE_SUBMARCA_COLLECTION_FAILED,
    CREATE_SUBMARCA_COLLECTION_SET_LOADING,
    UPDATE_PLAN,
    UPDATE_PLAN_SUCCESS,
    UPDATE_PLAN_FAILED,
    FETCH_PLAN,
    FETCH_PLAN_SUCCESS,
    FETCH_PLAN_FAILED,
    UPDATE_PLANS,
    UPDATE_PLANS_SUCCESS,
);
