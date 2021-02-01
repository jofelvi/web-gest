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
    createPlanSetLoading
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
);
