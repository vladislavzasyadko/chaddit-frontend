import {CREATE_THREAD, FETCH_THREAD, FETCH_THREADS, CLEAR_THREAD} from './types.js'
import {threadAPI} from "../../api/api";
import {CLEAR_THREADS, DELETE_THREAD, SEARCH_THREADS, UPDATE_THREAD} from "./types";

const initialState = {
    threads: [],
    thread: null,
}

export const threadReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_THREADS:
            return {
                ...state,
                threads: action.threads,
            }
        case FETCH_THREAD:
            return {
                ...state,
                thread: action.thread,
            }
        case CLEAR_THREAD:
            return {
                ...state,
                thread: action.thread,
            }
        case CLEAR_THREADS:
            return {
                ...state,
                threads: [],
            }
        case CREATE_THREAD:
            return {
                ...state,
                threads: [action.thread, ...state.threads]
            }
        case SEARCH_THREADS:
            return {
                ...state,
                searchWord: action.searchWord,
                threads: action.threads
            }
        case UPDATE_THREAD:
            return {
                ...state,
                threads: [action.thread, ...state.threads.filter(thread => thread.thread_id !== action.id)]
            }
        case DELETE_THREAD:
            return {
                ...state,
                threads: [...state.threads.filter(thread => thread.thread_id !== action.id)]
            }

        default:
            return state;
    }

}

/* istanbul ignore next */
export const fetchThreads = (topicId) => (dispatch) => {
    return threadAPI.getThreadByTopic(topicId)
        .then(threads => dispatch({type: FETCH_THREADS, threads: threads}))
}

/* istanbul ignore next */
export const searchThreads = (name) => (dispatch) => {
    return threadAPI.searchThread(name)
        .then(threads => dispatch({type: SEARCH_THREADS, threads: threads, searchWord: name}))
}

/* istanbul ignore next */
export const fetchThread = (threadId) => {
    return dispatch => {
        threadAPI.getThread(threadId)
            .then(thread => dispatch({type: FETCH_THREAD, thread: thread}))
    }
}

/* istanbul ignore next */
export const clearThread = () => (dispatch) => {
    return dispatch({type: CLEAR_THREAD, thread: null})
}

/* istanbul ignore next */
export const createThread = (topicId, thread) => {
    return dispatch => {
        threadAPI.createThread(topicId, thread)
            .then(thread => dispatch({type: CREATE_THREAD, thread: thread}))
    }
}

/* istanbul ignore next */
export const clearThreads = () => (dispatch) => {
    return dispatch({type: CLEAR_THREADS})
}

/* istanbul ignore next */
export const updateThread = (threadId, thread) => {
    return dispatch => {
        threadAPI.updateThread(threadId, thread)
            .then(thread => dispatch({type: UPDATE_THREAD, id: threadId, thread}))
    }
}

/* istanbul ignore next */
export const deleteThread = (threadId) => {
    return dispatch => {
        threadAPI.deleteThread(threadId)
        return dispatch({type: DELETE_THREAD, id: threadId})
    }
}