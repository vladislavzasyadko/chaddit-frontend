import {userAPI} from "../../api/api";
import {SET_USER, SET_USER_NAME, UPDATE_USER_NAME, UPDATE_USER_PASS} from "./types";

const initialState = {userName: '', userEmail: '', userPass: ''}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                userName: action.name,
                userTempName: action.name,
                userPass: action.pass,
                userId: action.id,
                userEmail: action.email,
                userTag: action.tag,
            }
        case SET_USER_NAME:
            return {
                ...state,
                userTempName: action.name,
            }
        // case SET_USER_PASS:
        //     return {
        //         ...state,
        //         userTempPass: action.pass,
        //     }
        case UPDATE_USER_NAME:
            return {
                ...state,
                userName: action.newName,
            }
        case UPDATE_USER_PASS:
            return {
                ...state,
                userPass: action.newPass,
            }
        default:
            return state;
    }

}

export const getUser = () => (dispatch) => {
    return userAPI.getUser()
        .then((response) => {
            const {user_name, user_pass, user_id, user_email, user_tag} = response.data;
            dispatch({
                type: SET_USER,
                name: user_name,
                pass: user_pass,
                email: user_email,
                id: user_id,
                tag: user_tag
            })
        }, (error) => {
            // console.log(error)
        });
}

export const updateUserName = name => dispatch => {
    return userAPI.updateName(name)
        .then((response) => {
            dispatch({type: UPDATE_USER_NAME, newName: name})
        }, (error) => {
            // console.log(error)
        });
}

export const updateUserPass = password => dispatch => {
    return userAPI.updatePass(password)
        .then((response) => {
            dispatch({type: UPDATE_USER_NAME, newPass: password})
        }, (error) => {
            // console.log(error)
        });
}

export const setUserName = name => dispatch => {
    return dispatch({type: SET_USER_NAME, name})
}