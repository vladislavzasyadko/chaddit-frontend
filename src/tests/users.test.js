import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import React from "react";
import {store} from "../redux/store";
import {SET_USER, SET_USERS} from "../redux/reducers/types";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import User from "../components/Users/User/User";
import Users from "../components/Users/Users";
import {adminAPI} from "../api/api";

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
                user_id: 21,
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
        ReactDOM.createPortal = jest.fn((element, node) => {
            return element
        })
        document.body.appendChild(container);
        mockStore = store
        mockStore.dispatch({
            type: SET_USER,
            name: 'admin',
            pass: undefined,
            email: 'admin@gmail.com',
            id: 1,
            tag: 1111,
            role: 'ADMIN',
        })
        mockStore.dispatch({type: SET_USERS, users: mockProps.users})
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        ReactDOM.createPortal.mockClear()
    });

    test('Users component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><Users {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.chatsHeader h1').textContent).toBe('Пользователи для ' + mockStore.getState().user.userRole)
        for (let i = 0; i < 3; i++) {
            expect(container.querySelectorAll('.chatElement')[i].querySelector('div').querySelectorAll('h3')[0].textContent).toBe(mockStore.getState().admin.users[i].user_name)
            expect(container.querySelectorAll('.chatElement')[i].querySelector('div').querySelectorAll('h3')[1].textContent).toBe(mockStore.getState().admin.users[i].user_email)
        }
    })

    test('Users component deleteUser event test', () => {
        act(() => {
            render(<Provider store={mockStore}><Users {...mockProps}/></Provider>, container)
        })

        let mockAdminUpdateUser = jest.spyOn(adminAPI, 'updateUser').mockImplementationOnce((id, user) => {
            return Promise.resolve({data: 'doesnt matter'})
        })

        const saveButton = container.querySelector('.closeButton')

        act(() => {
            saveButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })

        expect(mockAdminUpdateUser).toHaveBeenCalled()
        mockAdminUpdateUser.mockClear()
    })

    test('Users component openUser event test', () => {

        act(() => {
            render(<Provider store={mockStore}><Users {...mockProps}/></Provider>, container)
        })

        const userForm = container.querySelector('.chatElement')

        act(() => {
            userForm.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })

        const inputCreators = container.querySelectorAll('.inputCreator')

        expect(inputCreators[0].value).toBe(mockProps.users[0].user_name)
        expect(inputCreators[1].value).toBe(mockProps.users[0].user_email)
        expect(inputCreators[2].value).toBe('')
    })
})