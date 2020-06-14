import {applyMiddleware , createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers'


// const actions = nconf.get(actions);
const defaultState = {};

const middleWare = [thunk , logger];
const store = createStore(reducers , defaultState , applyMiddleware(...middleWare));

export default store; 