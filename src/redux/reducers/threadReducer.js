import {CREATE_THREAD, FETCH_THREAD, FETCH_THREADS, CLEAR_THREAD} from './types.js'
import {threadAPI} from "../../api/api";

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
        case CREATE_THREAD:
            return {
                ...state,
                threads: [action.thread, ...state.threads]
            }


        default:
            return state;
    }

}

export const fetchThreads = () => (dispatch) => {
    return threadAPI.getThreads()
        .then(threads => dispatch({type: FETCH_THREADS, threads: threads})) //dispatch({type: FETCH_THREAD, threads: threads}
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
    return dispatch => {
        threadAPI.createThread(topicId, thread)
            .then(thread => dispatch({type: CREATE_THREAD, thread: thread}))
    }
}
