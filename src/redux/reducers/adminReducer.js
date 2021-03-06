import {DELETE_USER, SET_USERS, UPDATE_USER} from "./types";
import {adminAPI} from "../../api/api";

const initialState = {
    users: [],
}
export const adminReducer = (state=initialState, action) => {
    switch (action.type) {

        case UPDATE_USER:
            return {
                ...state,
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case DELETE_USER:
            return {
                ...state,
                users: [...state.users.filter(user => user.user_id !== action.user_id)]
            }

        default:
            return {
                ...state
            }
    }

}

/* istanbul ignore next */
export const getUsers = () => (dispatch) => {
    return adminAPI.getUsers().then(response => dispatch({type:SET_USERS, users: response}))
}
/* istanbul ignore next */
export const updateUser = (id, user) => (dispatch) => {
    return adminAPI.updateUser(id, user).then(response => dispatch({type:UPDATE_USER, user_id: id}))
}

