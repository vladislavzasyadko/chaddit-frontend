import {render, unmountComponentAtNode} from "react-dom";
import {store} from "../redux/store";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Login from "../components/Login/Login";
import {adminAPI, loginAPI} from "../api/api";
import {createBrowserHistory} from "history";

describe('Login component testing', () => {
    let container = null
    let mockStore
    let mockHistory = createBrowserHistory()
    const mockProps = {
        history: mockHistory,
        isAuth: false
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

    test('Login component rendering test', () => {

        act(() => {
            render(<Provider store={mockStore}><Login {...mockProps}/></Provider>, container)
        })

        const inputFields = container.querySelectorAll('.inputField')

        expect(container.querySelector('.activeOption').textContent).toBe('Вход')
        expect(container.querySelector('.typeOption').textContent).toBe('Регистрация')
        expect(inputFields[0].getAttribute('placeholder')).toBe('Введите адрес эл. почты')
        expect(inputFields[1].getAttribute('placeholder')).toBe('Введите пароль')
        expect(container.querySelector('.buttonForm').textContent).toBe('Войти')
    })

    test('Login component rendering test (register)', () => {

        act(() => {
            render(<Provider store={mockStore}><Login {...mockProps}/></Provider>, container)
        })

        const registerButton = container.querySelector('.typeOption')

        act(() => {
            registerButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })

        expect(container.querySelector('.activeOption').textContent).toBe('Регистрация')
        expect(container.querySelector('.typeOption').textContent).toBe('Вход')

        const inputFields = container.querySelectorAll('.inputField')

        expect(inputFields[0].getAttribute('placeholder')).toBe('Введите имя')
        expect(inputFields[1].getAttribute('placeholder')).toBe('Введите адрес эл. почты')
        expect(inputFields[2].getAttribute('placeholder')).toBe('Введите пароль')
        expect(inputFields[3].getAttribute('placeholder')).toBe('Повторите пароль')

        expect(container.querySelector('.buttonForm').textContent).toBe('Регистрация')
    })

    test('Login component login action test', () => {

        act(() => {
            render(<Provider store={mockStore}><Login {...mockProps}/></Provider>, container)
        })

        const loginButton = container.querySelector('.buttonForm')

        let mockLoginLoginUser = jest.spyOn(loginAPI, 'login').mockImplementationOnce((email, password) => {
            return Promise.resolve({data: 'doesnt matter'})
        })

        act(() => {
            loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })

        expect(mockLoginLoginUser).toHaveBeenCalled()
        mockLoginLoginUser.mockClear()

    })

})