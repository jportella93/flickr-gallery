import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers'
import apiService from './middlewares/apiService';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(apiService()))
);

export default store