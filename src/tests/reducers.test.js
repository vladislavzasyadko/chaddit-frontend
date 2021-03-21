import {adminReducer} from "../redux/reducers/adminReducer";
import {authReducer} from "../redux/reducers/authReducer";
import {chatReducer} from "../redux/reducers/chatReducer";
import {postReducer} from "../redux/reducers/postsReducer";
import {searchReducer} from "../redux/reducers/searchReducer";
import {threadReducer} from "../redux/reducers/threadReducer";
import {topicReducer} from "../redux/reducers/topicReducer";
import {userReducer} from "../redux/reducers/userReducer";
import {
    DELETE_USER,
    SET_USERS,
    LOGIN,
    REGISTER,
    LOGOUT,
    TOKEN_EXPIRED,
    CREATE_CHAT,
    GET_CHATS
} from "../redux/reducers/types";

describe('adminReducer testing', () => {

    let users = [{username: 'danila', user_id: 1}, {username: 'nikita', user_id: 2}, {username: 'misha', user_id: 3}, {username: 'vlad', user_id: 4}]

    test('adminReducer initial state test', () => {
        expect(adminReducer(undefined, {})).toEqual({users: []})
    })

    test('adminReducer SET_USERS action test', () => {
        expect(adminReducer(undefined, {type: SET_USERS, users: users})).toEqual({users : users})
    })

    test('adminReducer DELETE_USERS action test', () => {
        let deleted_id = 1
        expect(adminReducer({users : users}, {type: DELETE_USER, user_id: deleted_id})).toEqual({users: [{username: 'nikita', user_id: 2}, {username: 'misha', user_id: 3}, {username: 'vlad', user_id: 4}] })
    })


})

describe('authReducer testing', () => {

    const initialState = {apiToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NzQwMTg3NTAsImlhdCI6MTYxNjMzODc1MCwic3ViIjo2M30.CCsgLTd8laloarkHqawq5fVrMlfAcvxOaB3UmHQDDwA', loggedIn: true}

    test('authReducer initial state test without api token', () => {
        let initialStateTest = undefined
        expect(authReducer(initialStateTest, {})).toEqual({})
        initialStateTest = initialState
        expect(authReducer(initialStateTest, {})).toEqual(initialStateTest)
    })

    test('authReducer LOGIN action test', () => {
        expect(authReducer(undefined, {type: LOGIN, apiToken: initialState.apiToken})).toEqual(initialState)
    })

    test('authReducer REGISTER action test', () => {
        expect(authReducer(undefined, {type: REGISTER, apiToken: initialState.apiToken})).toEqual(initialState)
    })

    test('authReducer LOGOUT action test ', () => {
        expect(authReducer(initialState, {type: LOGOUT})).toEqual({apiToken: '', loggedIn: false})
    })

    test('authReducer TOKEN_EXPIRED action test', () => {
        expect(authReducer(initialState, {type: TOKEN_EXPIRED})).toEqual({apiToken: '', loggedIn: false})
    })
})

describe('chatReducer testing', () => {


    test('chatReducer initial state test', () => {
        expect(chatReducer(undefined, {})).toEqual({
            chats: [],
            activeChat: '',
            messages: [],
        })
    })

    test('chatReducer CREATE_CHAT action test', () => {
        let response = {chat_id: 1, participants: [1, 2]}
        expect(chatReducer(undefined, {
            type: CREATE_CHAT,
            chat_id: response.chat_id,
            participants: response.participants,
        })).toEqual({chats: [{chat_id: 1, participants: [1, 2]}], activeChat: '', messages: []})
    })

})


test('postReducer initial state test', () => {
    expect(postReducer(undefined, {})).toEqual({
        posts: [],
    })
})

test('searchReducer initial state test', () => {
    expect(searchReducer(undefined, {})).toEqual({
        field: '',
        topicId: '',
    })
})

test('threadReducer initial state test', () => {
    expect(threadReducer(undefined, {})).toEqual({
        threads: []
    })
})

test('topicReducer initial state', () => {
    expect(topicReducer(undefined, {})).toEqual({
        topics: []
    })
})

test('userReducer initial state', () => {
    expect(userReducer(undefined, {})).toEqual({userName: '', userEmail: '', userPassStatus: ''})
})