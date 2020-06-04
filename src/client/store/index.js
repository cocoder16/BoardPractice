import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import signUp from './signUp';
import logIn from './logIn';
import userInfo from './userInfo';
import pwReset from './pwReset';
import board from './board';
import write from './write';
import reply from './reply';

const store = createStore(combineReducers({
    signUp, logIn, userInfo, pwReset, board, write, reply
}), applyMiddleware(thunk));

store.subscribe(() => {
    console.log("Store Updated", store.getState());
});

export default store;