import {store} from "../redux/store";
import {CREATE_CHAT, FETCH_THREADS, FETCH_TOPICS, LOGIN, SET_USER} from "../redux/reducers/types";
import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Chats from "../components/Chats/Chats";

describe('Chats component testing ', () => {
    let container = null;
    let mockStore
    const mockProps = {
        chats: [{
            active: true,
            chat_id: 71,
            created_at: '2021-03-22T16:13:28.439844',
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
            topic_id: 100
        }, {
            active: true,
            chat_id: 72,
            created_at: '2021-03-23T16:13:28.439844',
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
                    user_id: 22,
                    user_name: 'misha',
                    user_tag: '6666'
                }],
            topic_id: 101
        }],
        chatsActive: true,
        closeChats: function closeChats() {
        },
        currentId: 50,
        topics: [{
            active: true,
            author: {
                active: true,
                created_at: '2020-11-12T22:29:19.392312',
                role: {role_id: 1, role_name: 'ADMIN'},
                role_id: 1,
                updated_at: '2021-02-25T16:44:58.631157',
                user_email: 'admin@chaddit.tk',
                user_id: 3,
                user_name: 'admin',
                user_tag: '0897'
            },
            author_id: 3,
            created_at: '2021-02-25T15:55:09.631626',
            image: null,
            tags: [{tag: 'tag1', tag_id: 53, topic_id: 100}, {tag: 'tag2', tag_id: 54, topic_id: 100}],
            threads_count: 5,
            topic_id: 100,
            topic_title: 'test 1',
            updated_at: '2021-02-25T15:55:09.631626'
        }, {
            active: true,
            author: {
                active: true,
                created_at: '2020-11-12T22:29:19.392312',
                role: {role_id: 1, role_name: 'ADMIN'},
                role_id: 1,
                updated_at: '2021-02-25T16:44:58.631157',
                user_email: 'admin@chaddit.tk',
                user_id: 3,
                user_name: 'admin',
                user_tag: '0897'
            },
            author_id: 3,
            created_at: '2021-02-25T15:55:09.631626',
            image: null,
            tags: [{tag: 'tag3', tag_id: 53, topic_id: 100}, {tag: 'tag4', tag_id: 54, topic_id: 100}],
            threads_count: 5,
            topic_id: 101,
            topic_title: 'test 2',
            updated_at: '2021-02-25T15:55:09.631626'
        }, {
            active: true,
            author: {
                active: true,
                created_at: '2020-11-12T22:29:19.392312',
                role: {role_id: 1, role_name: 'ADMIN'},
                role_id: 1,
                updated_at: '2021-02-25T16:44:58.631157',
                user_email: 'admin@chaddit.tk',
                user_id: 3,
                user_name: 'admin',
                user_tag: '0897'
            },
            author_id: 3,
            created_at: '2021-02-25T15:55:09.631626',
            image: null,
            tags: [{tag: 'tag5', tag_id: 53, topic_id: 100}, {tag: 'tag6', tag_id: 54, topic_id: 100}],
            threads_count: 5,
            topic_id: 103,
            topic_title: 'test 3',
            updated_at: '2021-02-25T15:55:09.631626'
        }]
    }

    beforeEach(() => {
        ReactDOM.createPortal = jest.fn((element, node) => {
            return element
        })
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = store
        store.dispatch({
            type: SET_USER,
            name: mockProps.chats[0].participants[0].user_name,
            pass: '',
            email: mockProps.chats[0].participants[0].user_email,
            id: mockProps.chats[0].participants[0].user_id,
            tag: mockProps.chats[0].participants[0].user_tag,
            role: mockProps.chats[0].participants[0].role.role_name,
        })
        store.dispatch({
            type: CREATE_CHAT,
            chat_id: mockProps.chats[0].chat_id,
            participants: mockProps.chats[0].participants,
            topic_id: mockProps.chats[0].topic_id
        })
        store.dispatch({
            type: CREATE_CHAT,
            chat_id: mockProps.chats[1].chat_id,
            participants: mockProps.chats[1].participants,
            topic_id: mockProps.chats[1].topic_id
        })
        store.dispatch({type: FETCH_TOPICS, topics: mockProps.topics})
    })

    afterEach(() => {
        ReactDOM.createPortal.mockClear()
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Chats components rendering testing', () => {
        act(() => {
            render(<Provider store={mockStore}><Chats {...mockProps}/></Provider>, container)
        })

        for (let i = 0; i < container.querySelectorAll('.topicSelect option').length; i++) {
            expect(container.querySelectorAll('.topicSelect option')[i].textContent).toBe(mockProps.topics[i].topic_title)
        }
    })
})