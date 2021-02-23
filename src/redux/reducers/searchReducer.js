import {SET_SEARCH_FIELD} from "./types";

const initialState = {
    field: '',
}


export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_FIELD:
            return {
                ...state,
                field: action.field,
            }
        default:
            return state;
    }
}

export const setSearchField = (field) => (dispatch) => {
    return dispatch({type: SET_SEARCH_FIELD, field: field})
}
