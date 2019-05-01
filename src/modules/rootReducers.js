import { combineReducers } from 'redux';

import auth from './auth/reducers';
import users from './users/reducers';
import tasks from './tasks/reducers';

export default combineReducers({
  auth,
  users,
  tasks
});
