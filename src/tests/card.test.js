import {store} from "../redux/store";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Card from "../components/Card/Card";
import {formatDate} from "../utils/formatters";

const previewStyle = (preview) => {
    return preview.length * 16 > 600 * 2
}

describe('Card Component testing', () => {

    let container = null
    let mockStore
    const mockProps = {
        authorId: 19,
        authorName: 'testing#1111',
        cardId: 0,
        closeCard: function closeCard() {},
        color: 'rgba(26,247,88,0.8)',
        createdAt: '2021-02-18T19:32:40.785550',
        image: null,
        isColorLight: true,
        openCard: function openCard() {},
        preview: 'testing preview testing preview',
        threadId: 83,
        threadTitle: 'testing title testing title'
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

    test('Card Component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><Card {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.cardTitle').textContent).toBe(mockProps.threadTitle)
        if (previewStyle(mockProps.preview)) {
            if (mockProps.isColorLight) {
                expect(container.querySelector('.cardTextPreviewGradientLight').textContent).toBe(mockProps.preview)
            } else {
                expect(container.querySelector('.cardTextPreviewGradientDark').textContent).toBe(mockProps.preview)
            }
        } else {
            if (mockProps.isColorLight) {
                expect(container.querySelector('.cardTextPreviewLight').textContent).toBe(mockProps.preview)
            } else {
                expect(container.querySelector('.cardTextPreview').textContent).toBe(mockProps.preview)
            }
        }
        expect(container.querySelector('.authorName').textContent).toBe('Автор: ' + mockProps.authorName)
        expect(container.querySelectorAll('.cardDate')[0].textContent).toBe(formatDate(mockProps.createdAt))
    })
})