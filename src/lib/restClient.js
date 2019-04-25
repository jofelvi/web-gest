import axios from 'axios';

let api = null;

const getHeaders = async () => {
  const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json'
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
