import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import signUp from './signUp';
import logIn from './logIn';
import userInfo from './userInfo';

const store = createStore(combineReducers({
    signUp, logIn, userInfo
}), applyMiddleware(thunk));

store.subscribe(() => {
    console.log("Store Updated", store.getState());
});

export default store;