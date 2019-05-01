import { get, post } from '../../lib/restClient';

export const login = data =>
  post(`/login/${process.env.REACT_APP_API_DEFAULT_REALM}`, data);

export const refreshToken = () => get('/~/jwt');
