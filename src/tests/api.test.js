import {adminAPI, chatAPI, threadAPI, topicAPI} from "../api/api";
import axios from "axios";
import {BASE_URL} from "../CONSTANTS/API_CONSTANTS";

let instance = axios.create({
    baseURL: BASE_URL,
})
const api_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NzQwMTg3NTAsImlhdCI6MTYxNjMzODc1MCwic3ViIjo2M30.CCsgLTd8laloarkHqawq5fVrMlfAcvxOaB3UmHQDDwA'
let chat_id_for_test

test('getThreads() request/response test', () =>{
    return threadAPI.getThreads().then(data => {
        data.forEach((thread) => {
            expect(thread).toHaveProperty('active', true)

            expect(thread).toHaveProperty('author')
            expect(typeof thread.author).toBe('object')

            expect(thread).toHaveProperty('author_id')
            expect(typeof thread.author_id).toBe('number')

            expect(thread).toHaveProperty('created_at')
            expect(typeof thread.created_at).toBe('string')

            expect(thread).toHaveProperty('image')
            expect(typeof thread.image === 'string' || typeof thread.image === 'object').toBeTruthy()

            expect(thread).toHaveProperty('posts')
            expect(typeof thread.posts).toBe('object')

            expect(thread).toHaveProperty('posts_count')
            expect(typeof thread.posts_count).toBe('number')

            expect(thread).toHaveProperty('thread_id')
            expect(typeof thread.thread_id).toBe('number')

            expect(thread).toHaveProperty('thread_title')
            expect(typeof thread.thread_title).toBe('string')

            expect(thread).toHaveProperty('topic_id')
            expect(typeof thread.topic_id).toBe('number')

            expect(thread).toHaveProperty('updated_at')
            expect(typeof thread.updated_at).toBe('string')

            expect(thread).toHaveProperty('views')
        })
    })
})

test('getTopics() request/response test', () => {
    return topicAPI.getTopics().then(data => {
        data.forEach((topic) => {
            expect(topic).toHaveProperty('active', true)

            expect(topic).toHaveProperty('author')
            expect(typeof topic.author).toBe('object')

            expect(topic).toHaveProperty('author_id')
            expect(typeof topic.author_id).toBe('number')

            expect(topic).toHaveProperty('created_at')
            expect(typeof topic.created_at).toBe('string')

            expect(topic).toHaveProperty('image')
            expect(typeof topic.image).toBe('object')

            expect(topic).toHaveProperty('tags')
            expect(typeof topic.tags).toBe('object')

            expect(topic).toHaveProperty('threads_count')
            expect(typeof topic.threads_count).toBe('number')

            expect(topic).toHaveProperty('topic_id')
            expect(typeof topic.topic_id).toBe('number')

            expect(topic).toHaveProperty('topic_title')
            expect(typeof topic.topic_title).toBe('string')

            expect(topic).toHaveProperty('updated_at')
            expect(typeof topic.updated_at).toBe('string')
        })
    })
})

test('getChats() request/response test', () => {

    jest.mock("../api/api",() => jest.fn())
    chatAPI.getChats = jest.fn(() => {
        return instance.get(`chaddit/c/chats`, {
            headers: {
                'api_token': api_token,
            }
        }).then(response => {
            return response.data
        })
    })

    return chatAPI.getChats().then(data => {
        data.forEach((chat) => {
            expect(chat).toHaveProperty('active', true)

            expect(chat).toHaveProperty('chat_id')
            expect(typeof chat.chat_id).toBe('number')

            expect(chat).toHaveProperty('created_at')
            expect(typeof chat.created_at).toBe('string')

            expect(chat).toHaveProperty('full')
            expect(typeof chat['full']).toBe('boolean')

            expect(chat).toHaveProperty('participants')
            expect(typeof chat.participants).toBe('object')

            expect(chat).toHaveProperty('topic_id')
            expect(typeof chat.topic_id === 'number' || typeof chat.topic_id === 'object').toBeTruthy()

            expect(chat).toHaveProperty('updated_at')
            expect(typeof chat.updated_at).toBe('string')
        })
        chat_id_for_test = data[0].chat_id
    })
})

test('getMessages() request/response test', () => {

    jest.mock("../api/api",() => jest.fn())
    chatAPI.getMessages = jest.fn((chat_id) => {
        return instance.get(`chaddit/c/messages/${chat_id}`, {
            headers: {
                'api_token': api_token,
            },
            params: {
                limit: -1
            }
        }).then(response => {
            return response.data
        })
    })

    return chatAPI.getMessages(chat_id_for_test).then(data => {
        data.forEach((message) => {
            expect(message).toHaveProperty('active', true)

            expect(message).toHaveProperty('author_id')
            expect(typeof message.author_id).toBe('number')

            expect(message).toHaveProperty('body')
            expect(typeof message.body).toBe('string')

            expect(message).toHaveProperty('chat_id')
            expect(typeof message.chat_id).toBe('number')

            expect(message).toHaveProperty('created_at')
            expect(typeof message.created_at).toBe('string')

            expect(message).toHaveProperty('message_id')
            expect(typeof message.message_id).toBe('number')

            expect(message).toHaveProperty('updated_at')
            expect(typeof message.updated_at).toBe('string')
        })
    })
})

test('getUsers() request response test', () => {

    jest.mock("../api/api",() => jest.fn())
    adminAPI.getUsers = jest.fn((chat_id) => {
        return instance.get('chaddit/c/users', {
            headers: {
                'api_token': api_token,
            }
        }).then(response => {
            return response.data
        })
    })

    return adminAPI.getUsers().then(data => {
        data.forEach((user) => {
            expect(user).toHaveProperty('active', true)

            expect(user).toHaveProperty('created_at')
            expect(typeof user.created_at).toBe('string')

            expect(user).toHaveProperty('role')
            expect(typeof user.role).toBe('object')

            expect(user).toHaveProperty('role_id')
            expect(typeof user.role_id).toBe('number')

            expect(user).toHaveProperty('updated_at')
            expect(typeof user.updated_at).toBe('string')

            expect(user).toHaveProperty('user_email')
            expect(typeof user.user_email).toBe('string')

            expect(user).toHaveProperty('user_id')
            expect(typeof user.user_id).toBe('number')

            expect(user).toHaveProperty('user_name')
            expect(typeof user.user_name).toBe('string')

            expect(user).toHaveProperty('user_tag')
            expect(typeof user.created_at).toBe('string')
        })
    })
})