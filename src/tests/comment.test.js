import {store} from "../redux/store";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Comment from "../components/ActiveCard/components/Comment";

describe('Comment component testing', () => {

    let container = null
    let mockStore
    const mockProps = {
        body: 'test comment',
        handleClick: function handleClick() {
        },
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
        responsesStatus: true,
        userId: 1,
        userName: 'TestUser#1111'
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = store
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Comment Component Rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><Comment {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.commentText div:nth-child(1)').textContent).toBe(mockProps.userName)
        expect(container.querySelector('.commentText div:nth-child(2)').textContent).toBe(mockProps.body)
        for (let i = 1; i < container.querySelectorAll('.commentText').length - 1; i++) {
            expect(container.querySelectorAll('.commentText')[i].querySelector('div:nth-child(1)').textContent).toBe(mockProps.responses[i - 1].author.user_name + '#' + mockProps.responses[i - 1].author.user_tag)
            expect(container.querySelectorAll('.commentText')[i].querySelector('div:nth-child(2)').textContent).toBe(mockProps.responses[i - 1].body)
        }

    })

})