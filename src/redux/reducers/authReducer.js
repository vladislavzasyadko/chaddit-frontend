import {loginAPI} from "../../api/api";
import {FAILURE, LOGIN, LOGOUT, REGISTER} from "./types";

let api_token = localStorage.getItem('api_token');
const initialState = api_token ? {loggedIn: true, apiToken: api_token} : {};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('api_token', action.apiToken);
            console.log('add', localStorage)
            return {
                ...state,
                loggedIn: true,
                apiToken: action.apiToken,

            }
        case FAILURE:
            return {
                ...state,
            }
        case REGISTER:
            return {
                ...state,
                loggedIn: true,
                apiToken: action.apiToken,
            }
        case LOGOUT:
            localStorage.removeItem('api_token');
            return {
                ...state,
                loggedIn: false,
                apiToken: '',
            };

        default:
            return state;
    }

}

export const loginActionCreator = (email, password) => (dispatch) => {
    return loginAPI.login(email, password)
        .then((response) => {
            console.log(response.data)
            dispatch({type: LOGIN, apiToken: response.data.api_token})
        }, (error) => {
            console.log(error)
            dispatch({type: FAILURE, error: error})
        });
}

export const registerActionCreator = (name, email, password) => (dispatch) => {
    return loginAPI.register(name, email, password)
        .then((response) => {
            console.log(response.data)
            dispatch({type: REGISTER, apiToken: response.data.api_token})
        }, (error) => {
            console.log(error)
            dispatch({type: FAILURE, error: error})
        });
}

export const logoutActionCreator = () => (dispatch) => {
    console.log('logging out')
    return dispatch({type: LOGOUT})
}
