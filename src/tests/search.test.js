import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import {store} from "../redux/store";
import {SET_SEARCH_FIELD, SET_USER} from "../redux/reducers/types";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";
import Search from "../components/Header/Search/Search";
import React from "react";

describe('Search component testing ', () => {
    let container = null;
    let mockStore
    const mockProps = {
        field: 'TOPICS',
        topicId: ''
    }

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        mockStore = store
        store.dispatch({type: SET_SEARCH_FIELD, field: 'TOPICS'})
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('Search component rendering', () => {
        act(() => {
            render(<Provider store={mockStore}><Search {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.searchInput').getAttribute('placeholder')).toBe('Что я могу для Вас найти? ' + mockStore.getState().search.field)
    })

})