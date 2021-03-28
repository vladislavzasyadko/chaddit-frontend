import {render, unmountComponentAtNode} from "react-dom";
import User from "../components/Users/User/User";
import React from "react";
import {Provider} from "react-redux";
import {act} from "@testing-library/react";
import {adminAPI} from "../api/api";
import {store} from "../redux/store";

function createTestStore() {
    return store
}


describe('User component testing ', () => {

    let container = null;
    let mockStore
    const mockProps = {
        name: 'Vlad',
        mail: 'vlad@gmail.com',
        uid: '11',
        closeUser: function closeUser() {}
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = createTestStore()
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('User component rendering testing', () => {

        act(() => {
            render(<Provider store={mockStore}><User name={mockProps.name}
                                                     mail={mockProps.mail}/></Provider>, container)
        })

        const inputCreators = container.querySelectorAll('.inputCreator')

        expect(inputCreators[0].value).toBe(mockProps.name)
        expect(inputCreators[1].value).toBe(mockProps.mail)
        expect(inputCreators[2].value).toBe('')
    })

    test('User component saveButton event testing', () => {

        act(() => {
            render(<Provider store={mockStore}><User name={mockProps.name}
                                                     mail={mockProps.mail}/></Provider>, container)
        })

        const saveButton = document.querySelector('.saveButton')
        let mockAdminUpdateUser = jest.spyOn(adminAPI, 'updateUser').mockImplementationOnce((id, user) => {
            return Promise.resolve({data: 'doesnt matter'})
        })

        act(() => {
            saveButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })

        expect(mockAdminUpdateUser).toHaveBeenCalled()
        mockAdminUpdateUser.mockClear()
    })

    test('User component backButton event testing', () => {

        act(() => {
            render(<Provider store={mockStore}><User name={mockProps.name} mail={mockProps.mail}
                                                     closeUser={mockProps.closeUser}/></Provider>, container)
        })

        const backButton = document.querySelector('.deleteTopicButton')

        let mockAdminGetUsers = jest.spyOn(adminAPI, 'getUsers').mockImplementationOnce(() => {
            return Promise.resolve([{username: 'danila', user_id: 1}, {
                username: 'nikita',
                user_id: 2
            }, {username: 'misha', user_id: 3}, {username: 'vlad', user_id: 4}])
        })

        act(() => {
            backButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })
        expect(mockAdminGetUsers).toHaveBeenCalled()
        mockAdminGetUsers.mockClear()
    })
});
