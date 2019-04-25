// npm packages
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';

// reducer
import rootReducer from './rootReducers';

// rootSaga
import rootSagas from './rootSagas';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSagas);
  return store;
};
