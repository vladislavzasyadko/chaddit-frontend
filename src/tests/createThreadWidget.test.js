import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import {store} from "../redux/store";
import {FETCH_TOPICS, SET_USER, SET_USERS} from "../redux/reducers/types";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import Topic from "../components/Topics/Topic/Topic";
import React from "react";
import CreateThreadWidget from "../components/Header/HeaderUtils/CreateThreadWidget/CreateThreadWidget";

describe('createThreadWidget component testing', () => {
    let container = null
    let mockStore
    const mockProps = {
        closeCreator: function closeCreator() {},
        creatorActive: true
    }

    beforeEach(() => {
        container = document.createElement("div");
        ReactDOM.createPortal = jest.fn((element, node) => {
            return element
        })
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
        ReactDOM.createPortal.mockClear()
    });

    test('CreateThreadWidget component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><CreateThreadWidget {...mockProps}/></Provider>, container)
        })
        for(let i = 0; i < container.querySelectorAll('option').length; i++){
            expect(container.querySelectorAll('option')[i].getAttribute('value')).toBe(mockStore.getState().topics.topics[i].topic_title)
        }
    })
})