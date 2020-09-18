import * as dayjs from 'dayjs';
const TOKEN_STORAGE_KEY = 'api::auth_token';
const AUTH_NAME_STORAGE_KEY = 'api::auth_name';
const AUTH_USER_STORAGE_KEY = 'api::auth_user';

const utils = {
  getAuthToken: () => localStorage.getItem(TOKEN_STORAGE_KEY),
  setAuthToken: token => localStorage.setItem(TOKEN_STORAGE_KEY, token),
  getMe: () => {
    return {
      id: localStorage.getItem(AUTH_USER_STORAGE_KEY),
      name: localStorage.getItem(AUTH_NAME_STORAGE_KEY),
    }
  },
  setMe: (me) => {
    localStorage.setItem(AUTH_USER_STORAGE_KEY, me.id)
    localStorage.setItem(AUTH_NAME_STORAGE_KEY, me.name)
  },
  getTaskId: () => localStorage.getItem('taskId'),
  setTaskId: taskId => localStorage.setItem('taskId', taskId),
  removeAuthToken: () => localStorage.removeItem(TOKEN_STORAGE_KEY),
  isAuthd: () => !!localStorage.getItem(TOKEN_STORAGE_KEY),
  capitalizeWord: word => {
    const capitalizedWord = `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    return capitalizedWord;
  },
  sortDates: (_adate, _bdate) => {
    const aDate = dayjs(_adate,'DD/MM/YYYY').toDate();
    const bDate = dayjs(_bdate,'DD/MM/YYYY').toDate();
    if(aDate > bDate){
        return aDate-bDate
    } else {
        return bDate-aDate
    }
  },
  renderDate: (date) => dayjs(new Date(date)).format('DD/MM/YYYY')
  
};

export default utils;
