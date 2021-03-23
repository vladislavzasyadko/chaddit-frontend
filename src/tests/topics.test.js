import {store} from "../redux/store";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Topics from "../components/Topics/Topics";
import {createBrowserHistory} from 'history'
import {FETCH_TOPICS} from "../redux/reducers/types";

describe('Topics component testing', () => {

    let container = null
    let mockStore
    let mockHistory = createBrowserHistory()
    const mockProps = {
        history: mockHistory,
        topics: [{
            authorId: 5,
            authorName: 'admin#0579',
            cardId: '5',
            chats: [],
            color: 'rgba(89,119,228,0.8)',
            created_at: '2020-12-25T11:11:03.142635',
            currentId: 52,
            getTopics: function getTopics(){},
            image: null,
            isColorLight: false,
            tags: [{tag: 'тэг', tag_id: 49, topic_id: 98}, {tag: 'тэг2', tag_id: 50, topic_id: 98}],
            topicId: 98,
            topicTitle: 'Мок Пропс 1',
            userRole: 'ADMIN'
        }, {
            authorId: 5,
            authorName: 'admin#0579',
            cardId: '5',
            chats: [],
            color: 'rgba(89,119,228,0.8)',
            created_at: '2020-12-25T11:11:03.142635',
            currentId: 52,
            getTopics: function getTopics(){},
            image: null,
            isColorLight: false,
            tags: [{tag: 'тэг3', tag_id: 51, topic_id: 99}, {tag: 'тэг4', tag_id: 52, topic_id: 99}],
            topicId: 99,
            topicTitle: 'Мок Пропс 2',
            userRole: 'ADMIN'
        }, {
            authorId: 5,
            authorName: 'admin#0579',
            cardId: '5',
            chats: [],
            color: 'rgba(89,119,228,0.8)',
            created_at: '2020-12-25T11:11:03.142635',
            currentId: 52,
            getTopics: function getTopics(){},
            image: null,
            isColorLight: false,
            tags: [{tag: 'тэг', tag_id: 53, topic_id: 100}, {tag: 'тэг2', tag_id: 54, topic_id: 100}],
            topicId: 100,
            topicTitle: 'Мок Пропс 3',
            userRole: 'ADMIN'
        }]
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = store
        let topicTest = [{
            active: true,
            author: {active: true, created_at: '2020-11-12T22:29:19.392312', role: {role_id: 1, role_name: 'ADMIN'}, role_id: 1, updated_at: '2021-02-25T16:44:58.631157', user_email: 'admin@chaddit.tk', user_id: 3, user_name: 'admin', user_tag: '0897'},
            author_id: 3,
            created_at: '2021-02-25T15:55:09.631626',
            image: null,
            tags: [{tag: 'tag1', tag_id: 53, topic_id: 100}, {tag: 'tag2', tag_id: 54, topic_id: 100}],
            threads_count: 5,
            topic_id: 100,
            topic_title: 'test 1',
            updated_at: '2021-02-25T15:55:09.631626'
        }, {active: true,
            author: {active: true, created_at: '2020-11-12T22:29:19.392312', role: {role_id: 1, role_name: 'ADMIN'}, role_id: 1, updated_at: '2021-02-25T16:44:58.631157', user_email: 'admin@chaddit.tk', user_id: 3, user_name: 'admin', user_tag: '0897'},
            author_id: 3,
            created_at: '2021-02-25T15:55:09.631626',
            image: null,
            tags: [{tag: 'tag3', tag_id: 53, topic_id: 100}, {tag: 'tag4', tag_id: 54, topic_id: 100}],
            threads_count: 5,
            topic_id: 101,
            topic_title: 'test 2',
            updated_at: '2021-02-25T15:55:09.631626'
        }, {active: true,
            author: {active: true, created_at: '2020-11-12T22:29:19.392312', role: {role_id: 1, role_name: 'ADMIN'}, role_id: 1, updated_at: '2021-02-25T16:44:58.631157', user_email: 'admin@chaddit.tk', user_id: 3, user_name: 'admin', user_tag: '0897'},
            author_id: 3,
            created_at: '2021-02-25T15:55:09.631626',
            image: null,
            tags: [{tag: 'tag5', tag_id: 53, topic_id: 100}, {tag: 'tag6', tag_id: 54, topic_id: 100}],
            threads_count: 5,
            topic_id: 103,
            topic_title: 'test 3',
            updated_at: '2021-02-25T15:55:09.631626'}]
        mockStore.dispatch({type: FETCH_TOPICS, topics: topicTest})
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Topics component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><Topics {...mockProps}/></Provider>, container)
        })

        const cardTitles = container.querySelectorAll('.cardTitle')
        const tags = container.querySelectorAll('.tag')
        const tags_two = container.querySelectorAll('.tagLight')

        expect(cardTitles[0].textContent).toBe('test 1')
        expect(cardTitles[1].textContent).toBe('test 2')
        expect(cardTitles[2].textContent).toBe('test 3')
        expect(tags[0].textContent).toBe('tag1')
        expect(tags[1].textContent).toBe('tag2')
        expect(tags_two[0].textContent).toBe('tag3')
        expect(tags_two[1].textContent).toBe('tag4')
        expect(tags_two[2].textContent).toBe('tag5')
        expect(tags_two[3].textContent).toBe('tag6')
    } )
})