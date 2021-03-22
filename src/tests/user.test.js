import {render, unmountComponentAtNode} from "react-dom";
import User from "../components/Users/User/User";
import React from "react";
import {Provider} from "react-redux";
import {act} from "@testing-library/react";
import {updateUser} from "../redux/reducers/adminReducer";
import {adminAPI} from "../api/api";
import {combineReducers, createStore} from "redux";
import {userReducer} from "../redux/reducers/userReducer";
import {chatReducer} from "../redux/reducers/chatReducer";


export function createTestStore() {
    return createStore(
        combineReducers({
            user: userReducer,
            chats: chatReducer,
        })
    );
}


describe('User component testing ', () => {

    let container = null;
    let mockStore
    const mockProps = {
        name: 'Vlad',
        mail: 'vlad@gmail.com',
        uid: '11'
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
            render(<Provider store={mockStore}><User name={mockProps.name} mail={mockProps.mail}/></Provider>, container)
        })

        const inputCreators = container.querySelectorAll('.inputCreator')
        const userLabels = container.querySelectorAll('.userLabel')
        const textContent = ['Информация пользователя', 'Имя пользователя', 'Email пользователя', 'Пароль пользователя', ' Сохранить', ' Назад ']

        expect(container.querySelector('.adminHeader h1').textContent).toBe(textContent[0])
        expect(userLabels[0].textContent).toBe(textContent[1])
        expect(inputCreators[0].value).toBe(mockProps.name)
        expect(userLabels[1].textContent).toBe(textContent[2])
        expect(inputCreators[1].value).toBe(mockProps.mail)
        expect(userLabels[2].textContent).toBe(textContent[3])
        expect(inputCreators[2].value).toBe('')
        expect(container.querySelector('.saveButton').textContent).toBe(textContent[4])
        expect(container.querySelector('.deleteTopicButton').textContent).toBe(textContent[5])
    })

    test('User component event testing', () => {

        act(() => {
            render(<Provider store={mockStore}><User name={mockProps.name} mail={mockProps.mail}/></Provider>, container)
        })

        const saveButton = document.querySelector('.saveButton')
        const backButton = document.querySelector('.deleteTopicButton')

        let mockAdminUpdateUser = jest.spyOn(adminAPI, 'updateUser').mockImplementationOnce((id, user) => {
            Promise.resolve({data: 'doesnt matter'})
        })

        act(() => {
            saveButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })
        expect(mockAdminUpdateUser).toHaveBeenCalled()
    })
});
