import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {threadReducer} from "./reducers/threadReducer";
import {authReducer} from './reducers/authReducer'
import thunk from 'redux-thunk'
import {userReducer} from "./reducers/userReducer";

let reducers = combineReducers({
    threadData: threadReducer,
    auth: authReducer,
    user:userReducer,
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));