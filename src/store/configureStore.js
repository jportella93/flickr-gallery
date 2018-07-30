import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers'
import apiService from './middlewares/apiService';
import { BASE_URL } from '../config/api.config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(apiService(BASE_URL)))
);

export default store