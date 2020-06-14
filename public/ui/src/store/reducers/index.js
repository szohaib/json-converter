import { combineReducers } from 'redux';
import jsonStringReducer from './jsonReducer';

// console.log(jsonStringReducer())

export default combineReducers({
    fileContents : jsonStringReducer
})