// store.ts
import { combineReducers, createStore } from 'redux';
import classReducer from './classReducer';
import gradesReducer from './gradesReducers';
import authReducer from './authReducers';

const rootReducer = combineReducers({
  class: classReducer,
  grades: gradesReducer,
  auth: authReducer,
});
const store = createStore(rootReducer);

export default store;
