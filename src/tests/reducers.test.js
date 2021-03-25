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
    GET_CHATS,
    GET_MESSAGES,
    SEND_MESSAGE,
    CLEAR_MESSAGES,
    RECEIVE_MESSAGE,
    SET_POSTS,
    SEND_POST,
    CLEAR_POSTS,
    SET_SEARCH_FIELD,
    SET_TOPIC_ID,
    FETCH_THREADS,
    FETCH_THREAD,
    CLEAR_THREAD,
    CLEAR_THREADS,
    CREATE_THREAD,
    SEARCH_THREADS,
    SET_USER,
    SET_USER_NAME,
    UPDATE_USER_NAME,
    UPDATE_USER_PASS,
    FETCHING,
    SUCCESS,
    FAILURE,
    FETCH_TOPICS, GET_TOPICS_BY_TAG, SEARCH_TOPICS, UPDATE_TOPIC, SET_SEND_TOPIC_ID, CREATE_TOPIC
} from "../redux/reducers/types";

describe('adminReducer testing', () => {

    const users = [{username: 'danila', user_id: 1}, {username: 'nikita', user_id: 2}, {
        username: 'misha',
        user_id: 3
    }, {username: 'vlad', user_id: 4}]

    test('adminReducer initial state test', () => {
        expect(adminReducer(undefined, {})).toEqual({users: []})
    })

    test('adminReducer SET_USERS action test', () => {
        expect(adminReducer(undefined, {type: SET_USERS, users: users})).toEqual({users: users})
    })

    test('adminReducer DELETE_USERS action test', () => {
        const deleted_id = 1
        expect(adminReducer({users: users}, {
            type: DELETE_USER,
            user_id: deleted_id
        })).toEqual({
            users: [{username: 'nikita', user_id: 2}, {username: 'misha', user_id: 3}, {
                username: 'vlad',
                user_id: 4
            }]
        })
    })


})

describe('authReducer testing', () => {

    const initialState = {
        apiToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NzQwMTg3NTAsImlhdCI6MTYxNjMzODc1MCwic3ViIjo2M30.CCsgLTd8laloarkHqawq5fVrMlfAcvxOaB3UmHQDDwA',
        loggedIn: true
    }

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
        const response = {chat_id: 1, participants: [1, 2]}
        expect(chatReducer(undefined, {
            type: CREATE_CHAT,
            chat_id: response.chat_id,
            participants: response.participants,
        })).toEqual({chats: [{chat_id: 1, participants: [1, 2]}], activeChat: '', messages: []})
    })

    test('chatReducer GET_CHATS action test', () => {
        const response = [{chat_id: 1, participants: [1, 2]}, {chat_id: 2, participants: [2, 3]}, {
            chat_id: 3,
            participants: [3, 4]
        }]
        expect(chatReducer(undefined, {type: GET_CHATS, chats: response})).toEqual({
            chats: [{
                chat_id: 1,
                participants: [1, 2]
            }, {chat_id: 2, participants: [2, 3]}, {chat_id: 3, participants: [3, 4]}], activeChat: '', messages: []
        })
    })

    test('chatReducer GET_MESSAGES action test', () => {
        const response = [{message_id: 1, chat_id: 1, body: 'test1'}, {
            message_id: 2,
            chat_id: 1,
            body: 'test2'
        }, {message_id: 3, chat_id: 2, body: 'test3'}]
        expect(chatReducer(undefined, {type: GET_MESSAGES, messages: response})).toEqual({
            chats: [],
            activeChat: '',
            messages: [{message_id: 1, chat_id: 1, body: 'test1'}, {
                message_id: 2,
                chat_id: 1,
                body: 'test2'
            }, {message_id: 3, chat_id: 2, body: 'test3'}],
        })
    })

    test('chatReducer SEND_MESSAGE action test', () => {
        const response = {message_id: 1, chat_id: 1, body: 'test1'}
        const initialState = {
            chats: [],
            activeChat: '',
            messages: [{message_id: 1, chat_id: 1, body: 'test1'}],
        }
        expect(chatReducer(initialState, {type: SEND_MESSAGE, message: response})).toEqual({
            chats: [],
            activeChat: '',
            messages: [{message_id: 1, chat_id: 1, body: 'test1'}],
        })
    })

    test('chatReducer CLEAR_MESSAGES action test', () => {
        const initialState = {
            chats: [{chat_id: 1, participants: [1, 2]}, {chat_id: 2, participants: [2, 3]}, {
                chat_id: 3,
                participants: [3, 4]
            }],
            activeChat: '',
            messages: [{message_id: 1, chat_id: 1, body: 'test1'}, {
                message_id: 2,
                chat_id: 1,
                body: 'test2'
            }, {message_id: 3, chat_id: 2, body: 'test3'}],
        }
        expect(chatReducer(initialState, {type: CLEAR_MESSAGES})).toEqual({
            chats: [{chat_id: 1, participants: [1, 2]}, {chat_id: 2, participants: [2, 3]}, {
                chat_id: 3,
                participants: [3, 4]
            }],
            activeChat: '',
            messages: [],
        })
    })

    test('chatReducer RECEIVE_MESSAGE action test', () => {
        const message = {message_id: 2, chat_id: 1, body: 'test2'}
        const initialState = {
            chats: [],
            activeChat: '',
            messages: [{message_id: 1, chat_id: 1, body: 'test1'}, {message_id: 3, chat_id: 2, body: 'test3'}],
        }
        expect(chatReducer(initialState, {type: RECEIVE_MESSAGE, message: message})).toEqual({
            chats: [],
            activeChat: '',
            messages: [{message_id: 1, chat_id: 1, body: 'test1'}, {
                message_id: 3,
                chat_id: 2,
                body: 'test3'
            }, {message_id: 2, chat_id: 1, body: 'test2'}],
        })
    })

})

describe('postsReducer testing', () => {

    test('postReducer initial state test', () => {
        expect(postReducer(undefined, {})).toEqual({
            posts: [],
        })
    })

    test('postReducer SET_POSTS action test', () => {
        const posts = [{post_id: 1, body: 'test1'}, {post_id: 2, body: 'test2'}, {post_id: 3, body: 'test3'}]
        expect(postReducer(undefined, {type: SET_POSTS, posts: posts})).toEqual({posts: posts})
    })

    test('postReducer SEND_POST action test', () => {
        const initialState = {
            posts: [{post_id: 1, responses: [], body: 'test1'}, {
                post_id: 2,
                responses: [],
                body: 'test2'
            }, {post_id: 3, responses: [], body: 'test3'}]
        }
        const post = {post_id: 4, responses: [], body: 'test4'}
        const parentId = 1
        expect(postReducer(initialState, {type: SEND_POST, post: post, parentId: parentId})).toEqual({
            posts: [
                {post_id: 1, responses: [{post_id: 4, responses: [], body: 'test4'}], body: 'test1'},
                {post_id: 2, responses: [], body: 'test2'},
                {post_id: 3, responses: [], body: 'test3'}]
        })
    })

    test('postReducer CLEAR_POSTS action test', () => {
        const initialState = {
            posts: [{post_id: 1, responses: [], body: 'test1'}, {
                post_id: 2,
                responses: [],
                body: 'test2'
            }, {post_id: 3, responses: [], body: 'test3'}]
        }
        expect(postReducer(initialState, {type: CLEAR_POSTS})).toEqual({posts: []})
    })
})

describe('searchReducer testing', () => {

    test('searchReducer initial state test', () => {
        expect(searchReducer(undefined, {})).toEqual({
            field: '',
            topicId: '',
        })
    })

    test('searchReducer SET_SEARCH_FIELD action test', () => {
        const field = 'search field'
        expect(searchReducer(undefined, {type: SET_SEARCH_FIELD, field: field})).toEqual({
            field: 'search field',
            topicId: '',
        })
    })

    test('searchReducer SET_TOPIC_ID action test', () => {
        const id = 123
        expect(searchReducer(undefined, {type: SET_TOPIC_ID, topicId: id})).toEqual({
            field: '',
            topicId: 123,
        })
    })
})

describe('threadReducer testing', () => {

    test('threadReducer initial state test', () => {
        expect(threadReducer(undefined, {})).toEqual({
            threads: [],
            thread: null,
        })
    })

    test('threadReducer FETCH_THREADS action test', () => {
        const threads = [{thread_id: 1, body: 'test1'}, {thread_id: 2, body: 'test2'}, {thread_id: 3, body: 'test3'}]
        expect(threadReducer(undefined, {type: FETCH_THREADS, threads: threads})).toEqual({
            thread: null, threads: [{thread_id: 1, body: 'test1'},
                {thread_id: 2, body: 'test2'},
                {thread_id: 3, body: 'test3'}]
        })
    })

    test('threadReducer FETCH_THREAD action test', () => {
        const thread = {thread_id: 1, body: 'test1'}
        expect(threadReducer(undefined, {type: FETCH_THREAD, thread: thread})).toEqual({
            threads: [],
            thread: {thread_id: 1, body: 'test1'}
        })
    })

    test('threadReducer CLEAR_THREAD action test', () => {
        const initialState = {
            thread: {thread_id: 4, body: 'test4'},
            threads: [{thread_id: 1, body: 'test1'}, {thread_id: 2, body: 'test2'}, {thread_id: 3, body: 'test3'}]
        }
        expect(threadReducer(initialState, {type: CLEAR_THREAD, thread: null})).toEqual({
            thread: null,
            threads: [{thread_id: 1, body: 'test1'}, {thread_id: 2, body: 'test2'}, {thread_id: 3, body: 'test3'}]
        })
    })

    test('threadReducer CLEAR_THREADS action test', () => {
        const initialState = {
            thread: {thread_id: 4, body: 'test4'},
            threads: [{thread_id: 1, body: 'test1'}, {thread_id: 2, body: 'test2'}, {thread_id: 3, body: 'test3'}]
        }
        expect(threadReducer(initialState, {type: CLEAR_THREADS})).toEqual({
            thread: {thread_id: 4, body: 'test4'},
            threads: []
        })
    })

    test('threadReducer CREATE_THREAD action test', () => {
        const thread = {thread_id: 1, body: 'test1'}
        expect(threadReducer(undefined, {type: CREATE_THREAD, thread: thread})).toEqual({
            threads: [{thread_id: 1, body: 'test1'}],
            thread: null,
        })
    })

    test('threadReducer SEARCH_THREADS action test', () => {
        const threads = [{thread_id: 1, body: 'test1'}, {thread_id: 2, body: 'test2'}, {thread_id: 3, body: 'test3'}]
        expect(threadReducer(undefined, {type: SEARCH_THREADS, threads: threads})).toEqual({
            threads: [{thread_id: 1, body: 'test1'}, {thread_id: 2, body: 'test2'}, {thread_id: 3, body: 'test3'}],
            thread: null,
        })
    })
})

describe('topicReducer testing', () => {

    test('topicReducer initial state', () => {
        expect(topicReducer(undefined, {})).toEqual({
            topics: []
        })
    })

    test('topicReducer FETCH_TOPICS action test', () => {
        const mockTopics = [{topic_id: 1, topic_name: 'test1'}, {topic_id: 2, topic_name: 'test2'}]
        expect(topicReducer(undefined, {type: FETCH_TOPICS, topics: mockTopics})).toEqual({topics: mockTopics})
    })

    test('topicReducer GET_TOPICS_BY_TAG action test', () => {
        const mockTopics = [{topic_id: 1, topic_name: 'test1'}, {topic_id: 2, topic_name: 'test2'}]
        expect(topicReducer(undefined, {type: GET_TOPICS_BY_TAG, topics: mockTopics})).toEqual({topics: mockTopics})
    })

    test('topicReducer SEARCH_TOPICS action test', () => {
        const mockTopics = [{topic_id: 1, topic_name: 'test1'}, {topic_id: 2, topic_name: 'test2'}]
        expect(topicReducer(undefined, {type: SEARCH_TOPICS, topics: mockTopics})).toEqual({topics: mockTopics})
    })

    test('topicReducer UPDATE_TOPIC action test', () => {
        expect(topicReducer(undefined, {type: UPDATE_TOPIC})).toEqual({topics: []})
    })

    test('topicReducer CREATE_TOPIC action test', () => {
        const mockId = 1
        const mockTopics = [{topic_id: 1, topic_name: 'test1'}, {topic_id: 2, topic_name: 'test2'}]
        expect(topicReducer(undefined, {type: CREATE_TOPIC, id: mockId, topic: mockTopics})).toEqual({
            sendTopicId: mockId,
            topics: [mockTopics]
        })
    })

    test('topicReducer SET_SEND_TOPIC_ID action test', () => {
        const mockId = 1
        expect(topicReducer(undefined, {type: SET_SEND_TOPIC_ID, id: mockId})).toEqual({
            topics: [],
            sendTopicId: mockId
        })
    })
})

describe('userReducer testing', () => {

    test('userReducer initial state', () => {
        expect(userReducer(undefined, {})).toEqual({userName: '', userEmail: '', userPassStatus: ''})
    })

    test('userReducer SET_USER action test', () => {
        const mockResponse = {
            name: 'vlad',
            pass: '12345',
            email: 'vlad@gmail.com',
            user_id: 1,
            user_tag: '6789',
            role: 'user'
        }
        expect(userReducer(undefined, {
            type: SET_USER,
            name: mockResponse.name,
            pass: mockResponse.pass,
            email: mockResponse.email,
            id: mockResponse.user_id,
            tag: mockResponse.user_tag,
            role: mockResponse.role,
        })).toEqual({
            userName: 'vlad',
            userTempName: 'vlad',
            userPass: '12345',
            userId: 1,
            userEmail: 'vlad@gmail.com',
            userTag: '6789',
            userRole: 'user',
            userPassStatus: ''
        })
    })

    test('userReducer SET_USER_NAME action test', () => {
        const name = 'vlad'
        expect(userReducer(undefined, {type: SET_USER_NAME, name})).toEqual({
            userName: '',
            userEmail: '',
            userPassStatus: '',
            userTempName: 'vlad'
        })
    })

    test('userReducer UPDATE_USER_NAME action test', () => {
        const name = 'vlad'
        expect(userReducer(undefined, {type: UPDATE_USER_NAME, newName: name})).toEqual({
            userName: 'vlad',
            userEmail: '',
            userPassStatus: ''
        })
    })

    test('userReducer UPDATE_USER_PASS action test', () => {
        let mockUserPassStatus = SUCCESS
        expect(userReducer(undefined, {
            type: UPDATE_USER_PASS,
            userPassStatus: mockUserPassStatus
        })).toEqual({userName: '', userEmail: '', userPassStatus: SUCCESS})
        mockUserPassStatus = FAILURE
        expect(userReducer(undefined, {
            type: UPDATE_USER_PASS,
            userPassStatus: mockUserPassStatus
        })).toEqual({userName: '', userEmail: '', userPassStatus: FAILURE})

    })
})
