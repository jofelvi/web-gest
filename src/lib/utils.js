const TOKEN_STORAGE_KEY = 'api::auth_token';

const utils = {
  getAuthToken: () => localStorage.getItem(TOKEN_STORAGE_KEY),
  setAuthToken: token => localStorage.setItem(TOKEN_STORAGE_KEY, token),
  removeAuthToken: () => localStorage.removeItem(TOKEN_STORAGE_KEY),
  isAuthd: () => !!localStorage.getItem(TOKEN_STORAGE_KEY)
};

export default utils;
