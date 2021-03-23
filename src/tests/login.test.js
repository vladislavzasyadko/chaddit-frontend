import {render, unmountComponentAtNode} from "react-dom";
import {store} from "../redux/store";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Login from "../components/Login/Login";

describe('Login component testing', () => {
    let container = null
    let mockStore
    const mockProps = {
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

})