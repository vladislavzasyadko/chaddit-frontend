import {store} from "../redux/store";
import {render, unmountComponentAtNode} from "react-dom";
import {CREATE_CHAT, GET_MESSAGES, SET_USER} from "../redux/reducers/types";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import Users from "../components/Users/Users";
import React from "react";
import Chat from "../components/Chats/Chat/Chat";

describe('Chat component testing', () => {
    let container = null
    let mockStore
    const mockProps = {
        chat_id: 50,
        chats: {
            activeChat: '',
            chats: [{
                active: true,
                chat_id: 20,
                created_at: '2021-02-25T17:44:25.639702',
                full: true,
                participants: [{
                    active: true,
                    created_at: "2020-12-25T11:09:47.570949",
                    role: {role_id: 3, role_name: 'USER'},
                    updated_at: "2020-12-25T11:09:47.570949",
                    user_email: "danila@gmail.com",
                    user_id: 20,
                    user_name: 'danila',
                    user_tag: '7087'
                },
                    {
                        active: true,
                        created_at: "2020-12-25T11:09:47.570949",
                        role: {role_id: 3, role_name: 'USER'},
                        updated_at: "2020-12-25T11:09:47.570949",
                        user_email: "vlad@gmail.com",
                        user_id: 21,
                        user_name: 'vlad',
                        user_tag: '5555'
                    }],
                topic_id: 21,
                updated_at: '2021-03-23T16:41:13.056842'
            }],
            messages: [{
                active: true,
                author_id: 20,
                body: 'hello',
                chat_id: 50,
                created_at: '2021-02-25T16:46:32.311881',
                message_id: 1,
                updated_at: '2021-02-25T16:46:32.311881',
            }, {
                active: true,
                author_id: 21,
                body: 'hello this is my answer',
                chat_id: 50,
                created_at: '2021-02-26T16:46:32.311881',
                message_id: 2,
                updated_at: '2021-02-26T16:46:32.311881',
            }, {
                active: true,
                author_id: 21,
                body: 'and i continue with it',
                chat_id: 50,
                created_at: '2021-02-27T16:46:32.311881',
                message_id: 3,
                updated_at: '2021-02-27T16:46:32.311881',
            }, {
                active: true,
                author_id: 20,
                body: 'ok, i see',
                chat_id: 50,
                created_at: '2021-02-28T16:46:32.311881',
                message_id: 4,
                updated_at: '2021-02-28T16:46:32.311881',
            }]
        },
        closeChat: function closeChat(){},
        currentId: 20,
        messages: [{
            active: true,
            author_id: 20,
            body: 'hello',
            chat_id: 50,
            created_at: '2021-02-25T16:46:32.311881',
            message_id: 1,
            updated_at: '2021-02-25T16:46:32.311881',
        }, {
            active: true,
            author_id: 21,
            body: 'hello this is my answer',
            chat_id: 50,
            created_at: '2021-02-26T16:46:32.311881',
            message_id: 2,
            updated_at: '2021-02-26T16:46:32.311881',
        }, {
            active: true,
            author_id: 21,
            body: 'and i continue with it',
            chat_id: 50,
            created_at: '2021-02-27T16:46:32.311881',
            message_id: 3,
            updated_at: '2021-02-27T16:46:32.311881',
        }, {
            active: true,
            author_id: 20,
            body: 'ok, i see',
            chat_id: 50,
            created_at: '2021-02-28T16:46:32.311881',
            message_id: 4,
            updated_at: '2021-02-28T16:46:32.311881',
        }],
        names: 'danila and vlad'
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = store
        store.dispatch({
            type: SET_USER,
            name: mockProps.chats.chats[0].participants[0].user_name,
            pass: '',
            email: mockProps.chats.chats[0].participants[0].user_email,
            id: mockProps.chats.chats[0].participants[0].user_id,
            tag: mockProps.chats.chats[0].participants[0].user_tag,
            role: mockProps.chats.chats[0].participants[0].role.role_name,
        })
        store.dispatch({type: CREATE_CHAT, chat_id: mockProps.currentId, participants: mockProps.chats.chats[0].participants, topic_id: mockProps.chats.chats[0].topic_id})
        store.dispatch({type: GET_MESSAGES, messages: mockProps.messages})
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Chat components rendering testing', () => {
        act(() => {
            render(<Provider store={mockStore}><Chat {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.chatHeader h2').textContent).toBe('Комната ' + mockProps.names)
        for(let i = 0; i < container.querySelectorAll('.myMessage').length; i++){
            expect(container.querySelectorAll('.myMessage')[i].textContent).toBe(mockProps.messages.filter(message => message.author_id === mockStore.getState().user.userId)[i].body)
        }
        for(let i = 0; i < container.querySelectorAll('.personMessage').length; i++){
            expect(container.querySelectorAll('.personMessage')[i].textContent).toBe(mockProps.messages.filter(message => message.author_id !== mockStore.getState().user.userId)[i].body)
        }
    })
})