import {unmountComponentAtNode} from "react-dom";
import React from "react";
import {store} from "../redux/store";

describe('Users component testing', () => {

    let container = null
    let mockStore
    const mockProps = {
        closeUsers: function closeUsers() {},
        currentId: 63,
        userRole: 'ADMIN',
        users: [
            {
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
                user_id: 20,
                user_name: 'vlad',
                user_tag: '5555'
            },
            {
                active: true,
                created_at: "2020-12-25T11:09:47.570949",
                role: {role_id: 3, role_name: 'USER'},
                updated_at: "2020-12-25T11:09:47.570949",
                user_email: "misha@gmail.com",
                user_id: 20,
                user_name: 'misha',
                user_tag: '6666'
            },
            {
                active: true,
                created_at: "2020-12-25T11:09:47.570949",
                role: {role_id: 3, role_name: 'USER'},
                updated_at: "2020-12-25T11:09:47.570949",
                user_email: "nikita@gmail.com",
                user_id: 20,
                user_name: 'nikita',
                user_tag: '7033'
            }],
        usersActive: false
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

    test('Users components rendering testing', () => {

    })
})