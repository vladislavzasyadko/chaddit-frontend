import {createStore, applyMiddleware, compose} from "redux";
import {topicsReducer} from "./reducers/topicsReducer";
import thunk from 'redux-thunk'

export const store = createStore(topicsReducer, compose(applyMiddleware(thunk)));