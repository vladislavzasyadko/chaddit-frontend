import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {topicsReducer} from "./reducers/topicsReducer";
import {authReducer} from './reducers/authReducer'
import thunk from 'redux-thunk'

let reducers = combineReducers({
    topicsData: topicsReducer,
    auth: authReducer,
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));