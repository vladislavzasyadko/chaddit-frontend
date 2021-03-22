import {unmountComponentAtNode, render} from "react-dom";
import User from "../components/Users/User/User";
import React from "react";
import {Provider} from "react-redux";
import {act} from "@testing-library/react";
import configureStore from 'redux-mock-store'

const storeConfig = configureStore([])

function nodeToString ( node ) {
    let tmpNode = document.createElement( "div" );
    tmpNode.appendChild( node.cloneNode( true ) );
    let str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE
    return str;
}

describe('User component testing ', () => {

    let container = null;
    let mockStore

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = storeConfig({
            user: {
                userName: '',
                userTempName: '',
                userPass: '',
                userId: '',
                userEmail: '',
                userTag: '',
                userRole: ''
            },
            chats: {
                chats: [],
                activeChat: '',
                messages: [],
            }
        })
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('User component rendering testing', () => {

        const mockUser = {
            name: 'Vlad',
            mail: 'vlad@gmail.com'
        }

        act(() => {
            render(<Provider store={mockStore}><User name={mockUser.name} mail={mockUser.mail}/></Provider>, container)
        })

        const inputCreators = container.querySelectorAll('.inputCreator')
        const userLabels = container.querySelectorAll('.userLabel')
        const textContent = ['Информация пользователя', 'Имя пользователя', 'Email пользователя', 'Пароль пользователя', ' Сохранить', ' Назад ']

        expect(container.querySelector('.adminHeader h1').textContent).toBe(textContent[0])
        expect(userLabels[0].textContent).toBe(textContent[1])
        expect(inputCreators[0].value).toBe(mockUser.name)
        expect(userLabels[1].textContent).toBe(textContent[2])
        expect(inputCreators[1].value).toBe(mockUser.mail)
        expect(userLabels[2].textContent).toBe(textContent[3])
        expect(inputCreators[2].value).toBe(mockStore.getState().user.userPass)
        expect(container.querySelector('.saveButton').textContent).toBe(textContent[4])
        expect(container.querySelector('.deleteTopicButton').textContent).toBe(textContent[5])

    })
});
