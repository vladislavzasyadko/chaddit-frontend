import {CREATE_THREAD, FETCH_THREAD, FETCH_THREADS, CLEAR_THREAD} from './types.js'
import {threadAPI} from "../../api/api";
import {CLEAR_THREADS, SEARCH_THREADS} from "./types";

const initialState = {
    threads: []
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

        default:
            return state;
    }

}

export const fetchThreads = (topicId) => (dispatch) => {
    return threadAPI.getThreadByTopic(topicId)
        .then(threads => dispatch({type: FETCH_THREADS, threads: threads})) //dispatch({type: FETCH_THREAD, threads: threads}
}

export const searchThreads = (name) => (dispatch) => {
    console.log('search')
    return threadAPI.searchThread(name)
        .then(threads => dispatch({type: SEARCH_THREADS, threads: threads})) //dispatch({type: FETCH_THREAD, threads: threads}
}

export const fetchThread = (threadId) => {
    return dispatch => {
        threadAPI.getThread(threadId)
            .then(thread => dispatch({type: FETCH_THREAD, thread: thread}))
    }
}

export const clearThread = () => (dispatch) => {
    return dispatch({type: CLEAR_THREAD, threads: ''})
}

export const createThread = (topicId, thread) => {
    // console.log('reduce', thread.image)
    return dispatch => {
        threadAPI.createThread(topicId, thread)
            .then(thread => dispatch({type: CREATE_THREAD, thread: thread}))
    }
}

export const clearThreads = () => (dispatch) =>  {
    return dispatch({type: CLEAR_THREADS})
}