import {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Topic from "../components/Topics/Topic/Topic";
import {store} from "../redux/store";

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
        getTopics: function getTopics(){},
        image: null,
        isColorLight: false,
        tags: [{tag: 'тэг', tag_id: 49, topic_id: 98}, {tag: 'тэг2', tag_id: 50, topic_id: 98}],
        topicId: 98,
        topicTitle: 'Мок Пропс',
        userRole: 'ADMIN'
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

    test('Topic component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><Topic {...mockProps}/></Provider>, container)
        })

        const tags = container.querySelectorAll('.tag')

        expect(container.querySelector('.card').getAttribute('style')).toBe('min-height: 100px; min-width: 250px; width: 23%; background-color: rgba(89, 119, 228, 0.8); color: rgb(208, 208, 208);')
        expect(container.querySelector('.cardTitle').textContent).toBe(mockProps.topicTitle)
        expect(tags[0].textContent).toBe(mockProps.tags[0].tag)
        expect(tags[1].textContent).toBe(mockProps.tags[1].tag)
    } )
})