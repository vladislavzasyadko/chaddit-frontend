import {store} from "../redux/store";
import ReactDOM from 'react-dom'
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import UserSettings from "../components/Header/HeaderUtils/UserSettings/UserSettings";
import {LOGIN, SET_USER} from "../redux/reducers/types";

describe('UserSettings component testing', () => {
    let container = null
    let mockStore
    const mockProps = {
        closeSettings: function closeSettings() {},
        isAuth: true,
        settingsActive: true,
        userEmail: 'mock@mock.com',
        userName: 'Mock User',
        userPass: undefined,
        userPassStatus: '',
        userTag: '1234'
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = store
        ReactDOM.createPortal = jest.fn((element, node) => {
            return element
        })
        mockStore.dispatch({type: SET_USER,
            name: 'Mock User',
            pass: undefined,
            email: 'mock@mock.com',
            id: 1,
            tag: '1234',
            role: 'ADMIN',})
        mockStore.dispatch({type: LOGIN, apiToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NzQwMTg3NTAsImlhdCI6MTYxNjMzODc1MCwic3ViIjo2M30.CCsgLTd8laloarkHqawq5fVrMlfAcvxOaB3UmHQDDwA'})
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        ReactDOM.createPortal.mockClear()
    });

    test('Login component rendering test', () => {

        act(() => {
            render(<Provider store={mockStore}><UserSettings {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.settings').firstChild.textContent).toBe('Здравствуйте, ' + mockStore.getState().user.userName)
        expect(container.querySelector('.settings div:nth-child(2)').textContent).toBe('Почта ' + mockStore.getState().user.userEmail)
        expect(container.querySelector('.userInput').getAttribute('placeholder')).toBe(mockStore.getState().user.userName + '#' + mockStore.getState().user.userTag)
        for(let i = 0; i < container.querySelectorAll('option').length; i++){
            expect(container.querySelectorAll('option')[i].getAttribute('value')).toBe(mockStore.getState().topics.topics[i].topic_title)
        }
        expect(container.querySelector('.chatsHeader h1').textContent).toBe('Пользователи для ' + mockStore.getState().user.userRole)

    })
})