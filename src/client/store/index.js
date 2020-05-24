import { combineReducers, createStore, applyMiddleware } from 'redux';
import signUp from './signUp';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    signUp
}), applyMiddleware(thunk));

store.subscribe(() => {
    console.log("Store Updated", store.getState());
});

export default store;