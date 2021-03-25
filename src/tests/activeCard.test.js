import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import {store} from "../redux/store";
import {FETCH_THREAD, SET_POSTS, SET_USER, SET_USERS} from "../redux/reducers/types";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import Comment from "../components/ActiveCard/components/Comment";
import React from "react";
import ActiveCard from "../components/ActiveCard/ActiveCard";
import {formatDate} from "../utils/formatters";

describe('ActiveCard component testing', () => {

    let container = null
    let mockStore
    const mockProps = {
        cardId: 80,
        closeActiveCard: function closeActiveCard(){},
        currentId: 70,
        info: undefined,
        posts: [{
            active: true,
            author: {
                active: true,
                created_at: "2020-12-25T11:09:47.570949",
                role: {role_id: 3, role_name: 'USER'},
                updated_at: "2020-12-25T11:09:47.570949",
                user_email: "vlad@gmail.com",
                user_id: 22,
                user_name: 'vlad',
                user_tag: '5555'
            },
            author_id: 22,
            body: 'test first post',
            created_at: '2021-02-19T08:46:32.182181',
            image: null,
            post_id: 100,
            responses: [{
                active: true,
                author: {
                    active: true,
                    created_at: "2020-12-25T11:09:47.570949",
                    role: {role_id: 3, role_name: 'USER'},
                    updated_at: "2020-12-25T11:09:47.570949",
                    user_email: "misha@gmail.com",
                    user_id: 20,
                    user_name: 'misha',
                    user_tag: '6666'
                },
                author_id: 20,
                body: 'test reply to test comment',
                created_at: "2020-12-25T11:09:47.570949",
                image: null,
                post_id: 101,
                responses: [],
                root_post_id: 100,
                thread_id: 83,
                updated_at: "2020-12-25T11:09:47.570949"
            }, {
                active: true,
                author: {
                    active: true,
                    created_at: "2020-12-25T11:09:47.570949",
                    role: {role_id: 3, role_name: 'USER'},
                    updated_at: "2020-12-25T11:09:47.570949",
                    user_email: "vlad@gmail.com",
                    user_id: 5,
                    user_name: 'vlad',
                    user_tag: '5555'
                },
                author_id: 20,
                body: 'test reply 2 to test comment',
                created_at: "2020-12-25T11:09:47.570949",
                image: null,
                post_id: 102,
                responses: [],
                root_post_id: 100,
                thread_id: 83,
                updated_at: "2020-12-25T11:09:47.570949"
            }],
            root_post_id: null,
            thread_id: 99,
            updated_at: '2021-02-19T08:46:32.182181'
        }],
        thread: {
            active: true,
            author: {
                active: true,
                created_at: "2020-12-25T11:09:47.570949",
                role: {role_id: 3, role_name: 'USER'},
                updated_at: "2020-12-25T11:09:47.570949",
                user_email: "vlad@gmail.com",
                user_id: 22,
                user_name: 'vlad',
                user_tag: '5555'
            },
            author_id: 22,
            created_at: '2020-12-25T11:09:47.570949',
            image: null,
            posts: [{
                active: true,
                author: {
                    active: true,
                    created_at: "2020-12-25T11:09:47.570949",
                    role: {role_id: 3, role_name: 'USER'},
                    updated_at: "2020-12-25T11:09:47.570949",
                    user_email: "vlad@gmail.com",
                    user_id: 22,
                    user_name: 'vlad',
                    user_tag: '5555'
                },
                author_id: 22,
                body: 'test first post',
                created_at: '2021-02-19T08:46:32.182181',
                image: null,
                post_id: 100,
                responses: [{
                    active: true,
                    author: {
                        active: true,
                        created_at: "2020-12-25T11:09:47.570949",
                        role: {role_id: 3, role_name: 'USER'},
                        updated_at: "2020-12-25T11:09:47.570949",
                        user_email: "misha@gmail.com",
                        user_id: 20,
                        user_name: 'misha',
                        user_tag: '6666'
                    },
                    author_id: 20,
                    body: 'test reply to test comment',
                    created_at: "2020-12-25T11:09:47.570949",
                    image: null,
                    post_id: 101,
                    responses: [],
                    root_post_id: 100,
                    thread_id: 83,
                    updated_at: "2020-12-25T11:09:47.570949"
                }, {
                    active: true,
                    author: {
                        active: true,
                        created_at: "2020-12-25T11:09:47.570949",
                        role: {role_id: 3, role_name: 'USER'},
                        updated_at: "2020-12-25T11:09:47.570949",
                        user_email: "vlad@gmail.com",
                        user_id: 5,
                        user_name: 'vlad',
                        user_tag: '5555'
                    },
                    author_id: 20,
                    body: 'test reply 2 to test comment',
                    created_at: "2020-12-25T11:09:47.570949",
                    image: null,
                    post_id: 102,
                    responses: [],
                    root_post_id: 100,
                    thread_id: 83,
                    updated_at: "2020-12-25T11:09:47.570949"
                }],
                root_post_id: null,
                thread_id: 99,
                updated_at: '2021-02-19T08:46:32.182181'
            }],
            posts_count: 3,
            thread_id: 83,
            thread_title: 'test thread name',
            topic_id: 90,
            updated_at: '2020-12-25T11:09:47.570949',
            views: 15
        },
        userName: 'vlad#5555'
    }

    beforeEach(() => {
        container = document.createElement("div");
        ReactDOM.createPortal = jest.fn((element, node) => {
            return element
        })
        document.body.appendChild(container);
        mockStore = store
        mockStore.dispatch({type: FETCH_THREAD, thread: mockProps.thread})
        mockStore.dispatch({type: SET_POSTS, posts: mockProps.posts})
        mockStore.dispatch({
            type: SET_USER,
            name: mockProps.thread.author.user_name,
            pass: '',
            email: mockProps.thread.author.user_email,
            id: mockProps.thread.author.user_id,
            tag: mockProps.thread.author.user_tag,
            role: mockProps.thread.author.role,
        })
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        ReactDOM.createPortal.mockClear()
    });

    test('ActiveCard rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><ActiveCard {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.activeCard_title h2').textContent).toBe(mockProps.thread.thread_title)
        expect(container.querySelector('.activeCard_time').textContent).toBe(formatDate(mockProps.thread.created_at))
        expect(container.querySelector('.commentText div:nth-child(1)').textContent).toBe(mockProps.thread.author.user_name + '#' + mockProps.thread.author.user_tag)
        for(let i = 1; i < container.querySelectorAll('.commentText').length; i++){
            expect(container.querySelectorAll('.commentText')[i].querySelector('div:nth-child(1)').textContent).toBe(mockProps.thread.posts[0].responses[i-1].author.user_name + '#' + mockProps.thread.posts[0].responses[i-1].author.user_tag)
            expect(container.querySelectorAll('.commentText')[i].querySelector('div:nth-child(2)').textContent).toBe(mockProps.thread.posts[0].responses[i-1].body)
        }
        expect(container.querySelector('.replyToPreview').textContent).toBe('Replying to: ' + mockProps.posts[0].body)

    })


})