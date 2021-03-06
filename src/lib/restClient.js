import axios from 'axios';

import { SET_TOKEN } from '../modules/auth/actionTypes';

import utils from './utils';
let api = null;
let storedToken = null;

export const tokenMiddleware = () => next => action => {
  const { type } = action;
  if (type === SET_TOKEN) {
    const {
      payload: { token }
    } = action;
    if (token) {
      storedToken = token;
    }
  }
  return next(action);
};

export const getHeaders = async () => {
  const token = storedToken || utils.getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  };
  return headers;
};

const getInitializedApi = () => {
  if (api) {
    return api;
  }
  api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: 'json'
  });
  return api;
};

export const get = async url => {
  const headers = await getHeaders();
  return getInitializedApi().get(url, { headers });
};

export const post = async (url, data) => {
  const headers = await getHeaders();
  return getInitializedApi().post(url, data, { headers });
};

export const put = async (url, data) => {
  const headers = await getHeaders();
  return getInitializedApi().put(url, data, { headers });
};

export const del = async url => {
  const headers = await getHeaders();
  return getInitializedApi().delete(url, { headers });
};

export const patch = async (url, data) => {
  const headers = await getHeaders();
  return getInitializedApi().patch(url, data, { headers });
};
