import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {threadReducer} from "./reducers/threadReducer";
import {authReducer} from './reducers/authReducer'
import thunk from 'redux-thunk'
import {userReducer} from "./reducers/userReducer";
import {topicReducer} from "./reducers/topicReducer";
import {postReducer} from "./reducers/postsReducer";
import {searchReducer} from "./reducers/searchReducer";
import {chatReducer} from "./reducers/chatReducer";

let reducers = combineReducers({
    threadData: threadReducer,
    auth: authReducer,
    user:userReducer,
    topics: topicReducer,
    posts: postReducer,
    search: searchReducer,
    chats: chatReducer,
});

export const store = createStore(reducers, compose(applyMiddleware(thunk)));