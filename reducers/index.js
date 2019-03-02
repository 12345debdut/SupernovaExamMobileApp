import {combineReducers} from 'redux';
import mathReducer from './mathReducer.js'
import userReducer from './userReducer.js'
import firebaseReducer from './firebase.js'
import index from './indexvalue.js';
import wbindex from './wbindexValue.js'
export default combineReducers({
  mathReducer,
  userReducer,
  firebaseReducer,
  index,
  wbindex
})
