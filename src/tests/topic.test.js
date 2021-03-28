import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Topic from "../components/Topics/Topic/Topic";
import {store} from "../redux/store";
import {SET_USER} from "../redux/reducers/types";

describe('Topic component testing', () => {

    let container = null;
    let mockStore
    const mockProps = {
        authorId: 5,
        authorName: 'admin#0579',
        cardId: '5',
        chats: [],
        color: 'rgba(89,119,228,0.8)',
        created_at: '2020-12-25T11:11:03.142635',
        currentId: 52,
        getTopics: function getTopics() {},
        image: null,
        isColorLight: false,
        tags: [{tag: 'тэг', tag_id: 49, topic_id: 98}, {tag: 'тэг2', tag_id: 50, topic_id: 98}],
        topicId: 98,
        topicTitle: 'Мок Пропс',
        userRole: 'USER'
    }

    beforeEach(() => {
        ReactDOM.createPortal = jest.fn((element, node) => {
            return element
        })
        container = document.createElement("div");
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
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        ReactDOM.createPortal.mockClear()
    });

    test('Topic component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><Topic {...mockProps}/></Provider>, container)
        })

        expect(container.querySelector('.cardTitle').textContent).toBe(mockProps.topicTitle)
        expect(container.querySelector('.deleteTopicButton')).toBeDefined()
        const tags = container.querySelectorAll('.tag')

        expect(tags[0].textContent).toBe(mockProps.tags[0].tag)
        expect(tags[1].textContent).toBe(mockProps.tags[1].tag)
    })

    test('Topic component handleClick event test', () => {

        act(() => {
            render(<Provider store={mockStore}><Topic {...mockProps}/></Provider>, container)
        })

        const deleteButton = container.querySelector('.deleteTopicButton')

        act(() => {
            deleteButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })
        expect(container.querySelector('.inputCreator').getAttribute('value')).toBe(mockProps.topicTitle)
        const tags = container.querySelector('.tagsContainer').querySelectorAll('.tag')
        expect(tags[0].textContent).toBe(mockProps.tags[0].tag)
        expect(tags[1].textContent).toBe(mockProps.tags[1].tag)
    })
})