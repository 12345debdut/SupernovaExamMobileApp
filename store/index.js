import {createStore,combineReducers,applyMiddleware} from 'redux';
import reducers from '../reducers/index.js';
const store=createStore(reducers,{});
export default store;
