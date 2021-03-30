import {userAPI} from "../../api/api";
import {
    FAILURE,
    FETCHING,
    SET_USER,
    SET_USER_NAME,
    SUCCESS,
    UPDATE_USER_NAME,
    UPDATE_USER_PASS,
    USER_LOGOUT
} from "./types";

const initialState = {userName: '', userEmail: '', userPassStatus: ''}

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
                userRole: action.role,
            }
        case SET_USER_NAME:
            return {
                ...state,
                userTempName: action.name,
            }
        case UPDATE_USER_NAME:
            return {
                ...state,
                userName: action.newName,
            }
        case UPDATE_USER_PASS:
            return {
                ...state,
                userPassStatus: action.userPassStatus,
            }
        case USER_LOGOUT:
            return {
                ...state,
                userName: '',
                userTempName: '',
                userPass: '',
                userId: '',
                userEmail: '',
                userTag: '',
                userRole: '',
            }
        default:
            return state;
    }

}

export const getUser = () => (dispatch) => {
    return userAPI.getUser()
        .then((response) => {
            const {user_name, user_pass, user_id, user_email, user_tag, role} = response.data;
            dispatch({
                type: SET_USER,
                name: user_name,
                pass: user_pass,
                email: user_email,
                id: user_id,
                tag: user_tag,
                role: role.role_name,
            })
        }, () => {
            // console.log(error)
        });
}

export const updateUserName = name => dispatch => {
    return userAPI.updateName(name)
        .then(() => {
            dispatch({type: UPDATE_USER_NAME, newName: name})
        }, () => {
            // console.log(error)
        });
}

export const updateUserPass = (oldPassword, newPassword) => dispatch => {
    dispatch({type: UPDATE_USER_PASS, userPassStatus: FETCHING})
    return userAPI.updatePass(oldPassword, newPassword)
        .then(() => {
            //console.log(response)
            dispatch({type: UPDATE_USER_PASS, userPassStatus: SUCCESS})
        }, () => {
            //console.log(error)
            dispatch({type: UPDATE_USER_PASS, userPassStatus: FAILURE})
        });
}

export const setUserName = name => dispatch => {
    return dispatch({type: SET_USER_NAME, name})
}

export const logoutUser = () => dispatch => {
    return dispatch({type: USER_LOGOUT})
}