import { createStore, applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
//import logger from 'redux-logger'
import AcuerdosComReducer from './commercialDeals/reducers'

// reducer
import rootReducer from './rootReducers';

// rootSaga
import rootSagas from './rootSagas';

import { tokenMiddleware } from '../lib/restClient';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [tokenMiddleware, sagaMiddleware, thunkMiddleware];

export default initialState => {
  const store = createStore(
      rootReducer,
      initialState,
      //reducers,
      composeWithDevTools(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSagas);
  return store;
};

