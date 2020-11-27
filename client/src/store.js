import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers.js';

const middlewares = [thunk];

const store = createStore(rootReducer, [], applyMiddleware(...middlewares));

export default store;