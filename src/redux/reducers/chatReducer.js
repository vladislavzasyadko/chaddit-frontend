import {CLEAR_MESSAGES, CREATE_CHAT, GET_CHATS, GET_MESSAGES, SEND_MESSAGE} from "./types";
import {chatAPI} from "../../api/api";

const initialState = {
    chats: [],
    activeChat: '',
    messages: [],
}

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CHAT:
            return {
                ...state,
                chats: [...state.chats,
                    {
                        chat_id: action.chat_id,
                        participants: action.participants
                    }]
            }
        case GET_CHATS:
            return {
                ...state,
                chats: [...action.chats]
            }
        case GET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
            }

        default:
            return state;
    }
}


export const createChat = () => (dispatch) => {
    return chatAPI.createChat().then(response => dispatch({
        type: CREATE_CHAT,
        chat_id: response.chat_id,
        participants: response.participants,
    }))
}

export const getChats = () => (dispatch) => {
    return chatAPI.getChats().then(response => dispatch({type: GET_CHATS, chats: response}))
}

export const getMessages = (chatId) => (dispatch) => {
    return chatAPI.getMessages(chatId).then(response => dispatch({type: GET_MESSAGES, messages: response}))
}

export const createMessage = (chatId, body) => (dispatch) => {
    return chatAPI.createMessage(chatId, body).then(response => dispatch({type: SEND_MESSAGE, message: response}))
    // response => dispatch({type: GET_MESSAGES, messages: response})
}
export const clearMessages = () => (dispatch) => {
    return dispatch({type: CLEAR_MESSAGES})
}