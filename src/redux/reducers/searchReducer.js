import {SET_SEARCH_FIELD, SET_TOPIC_ID, TOPICS} from "./types";

const initialState = {
    field: '',
    topicId: '',
}


export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_FIELD:
            return {
                ...state,
                field: action.field,
                topicId: action.field === TOPICS ? '' : state.topicId,
            }
        case SET_TOPIC_ID:
            return {
                ...state,
                topicId: action.topicId,
            }
        default:
            return state;
    }
}

/* istanbul ignore next */
export const setSearchField = (field) => (dispatch) => {
    return dispatch({type: SET_SEARCH_FIELD, field: field})
}

/* istanbul ignore next */
export const setSearchTopicId = (id) => (dispatch) => {
    return dispatch({type: SET_TOPIC_ID, topicId: id})
}
