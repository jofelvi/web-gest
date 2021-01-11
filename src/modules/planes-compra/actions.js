import { createActions } from 'redux-actions';

import {
    FETCH_PLANS,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_FAILED,
    FETCH_PLANS_LOADING,
} from './actionTypes';

export const {
    fetchPlans,
    fetchPlansSuccess,
    fetchPlansFailed,
    fetchPlansLoading
} = createActions(
    FETCH_PLANS,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_FAILED,
    FETCH_PLANS_LOADING,
);
