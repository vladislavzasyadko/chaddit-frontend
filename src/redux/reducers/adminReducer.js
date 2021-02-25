import {DELETE_USER, SET_USERS, UPDATE_USER} from "./types";
import {adminAPI} from "../../api/api";

const initialState = {
    users: [],
}
export const adminReducer = (state=initialState, action) => {
    switch (action.type) {

        case DELETE_USER:
            return {
                ...state,

            }
        case UPDATE_USER:
            return {

            }
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }

        default:
            return {
                ...state
            }
    }

}


export const getUsers = () => (dispatch) => {
    return adminAPI.getUsers().then(response => dispatch({type:SET_USERS, users: response}))
}
