import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {topicsReducer} from "./reducers/topicsReducer";
import {authReducer} from './reducers/authReducer'
import thunk from 'redux-thunk'
import {userReducer} from "./reducers/userReducer";

let reducers = combineReducers({
    topicsData: topicsReducer,
    auth: authReducer,
    user:userReducer,
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));