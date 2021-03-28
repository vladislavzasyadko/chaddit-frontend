import {store} from "../redux/store";
import {FETCH_THREADS, FETCH_TOPICS, LOGIN, SET_SEARCH_FIELD} from "../redux/reducers/types";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import Search from "../components/Header/Search/Search";
import React from "react";
import Feed from "../components/Feed/Feed";
import {formatDate} from "../utils/formatters";

describe('Feed component testing', () => {
    let container = null
    let mockStore
    const mockProps = {
        isAuth: true,
        match: {
            isExact: true,
            params: {id: 100}
        },
        threads: [{
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
            topic_id: 100,
            updated_at: '2020-12-25T11:09:47.570949',
            views: 15
        }, {
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
            created_at: '2019-12-25T11:09:47.570949',
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
                body: 'test first post 2',
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
            thread_id: 84,
            thread_title: 'test thread name 2',
            topic_id: 100,
            updated_at: '2019-12-25T11:09:47.570949',
            views: 12
        }],
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
            tags: [{tag: 'tag3', tag_id: 53, topic_id: 101}, {tag: 'tag4', tag_id: 54, topic_id: 101}],
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
            tags: [{tag: 'tag5', tag_id: 53, topic_id: 103}, {tag: 'tag6', tag_id: 54, topic_id: 103}],
            threads_count: 5,
            topic_id: 103,
            topic_title: 'test 3',
            updated_at: '2021-02-25T15:55:09.631626'
        }]
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = store
        store.dispatch({type: FETCH_THREADS, threads: mockProps.threads})
        store.dispatch({type: FETCH_TOPICS, topics: mockProps.topics})
        store.dispatch({
            type: LOGIN,
            apiToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NzQwMTg3NTAsImlhdCI6MTYxNjMzODc1MCwic3ViIjo2M30.CCsgLTd8laloarkHqawq5fVrMlfAcvxOaB3UmHQDDwA'
        })
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Feed component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><Feed {...mockProps}/></Provider>, container)
        })
        for (let i = 0; i < container.querySelectorAll('.cardText').length; i++) {
            expect(container.querySelectorAll('.cardText')[i].querySelector('.cardTitle').textContent).toBe(mockProps.threads[i].thread_title)
            expect(container.querySelectorAll('.cardText')[i].querySelector('.cardTextPreviewLight, .cardTextPreview, .cardTextPreviewGradientDark, .cardTextPreviewGradientLight').textContent).toBe(mockProps.threads[i].posts[0].body)
            expect(container.querySelectorAll('.cardText')[i].querySelector('.authorName').textContent).toBe('Автор: ' + mockProps.threads[i].author.user_name + '#' + mockProps.threads[i].author.user_tag)
            expect(container.querySelectorAll('.cardText')[i].querySelectorAll('.cardDate')[0].textContent).toBe(formatDate(mockProps.threads[i].created_at))
            expect(container.querySelectorAll('.cardText')[i].querySelectorAll('.cardDate')[1].textContent).toBe('views: ' + mockProps.threads[i].views)
        }
    })
})