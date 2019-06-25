const TOKEN_STORAGE_KEY = 'api::auth_token';

const utils = {
  getAuthToken: () => localStorage.getItem(TOKEN_STORAGE_KEY),
  setAuthToken: token => localStorage.setItem(TOKEN_STORAGE_KEY, token),
  getTaskId: () => localStorage.getItem('taskId'),
  setTaskId: taskId => localStorage.setItem('taskId', taskId),
  removeAuthToken: () => localStorage.removeItem(TOKEN_STORAGE_KEY),
  isAuthd: () => !!localStorage.getItem(TOKEN_STORAGE_KEY),
  capitalizeWord: word => {
    const capitalizedWord = `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    return capitalizedWord;
  }
};

export default utils;
