import ReactDOM, {render, unmountComponentAtNode} from "react-dom";
import {store} from "../redux/store";
import {SET_USER} from "../redux/reducers/types";
import {act} from "@testing-library/react";
import {Provider} from "react-redux";

import AdminTopic from "../components/Topics/Topic/AdminTopic";

describe('AdminTopic component tester', () => {

    let container = null;
    let mockStore
    const mockProps = {
        active: true,
        chats: {
            active: true,
            chat_id: 1,
            created_at: '2020-12-25T11:09:47.570949',
            full: true,
            participants: [{
                active: true,
                created_at: "2020-12-25T11:09:47.570949",
                role: {role_id: 3, role_name: 'USER'},
                updated_at: "2020-12-25T11:09:47.570949",
                user_email: "danila@gmail.com",
                user_id: 20,
                user_name: 'danila',
                user_tag: '7087'
            }, {
                active: true,
                created_at: "2020-12-25T11:09:47.570949",
                role: {role_id: 3, role_name: 'USER'},
                updated_at: "2020-12-25T11:09:47.570949",
                user_email: "vlad@gmail.com",
                user_id: 20,
                user_name: 'vlad',
                user_tag: '5555'
            }],
            topic_id: 10,
            updated_at: '2020-12-25T11:09:47.570949'
        },
        closeUser: function closeUser() {},
        currentId: 63,
        name: 'test name',
        tags: [{tag: 'tag1', tag_id: 49, topic_id: 60}, {tag: 'tag2', tag_id: 50, topic_id: 60}],
        topicId: 60
    }

    beforeEach(() => {
        container = document.createElement("div");
        ReactDOM.createPortal = jest.fn((element, node) => {
            return element
        })
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

    test('AdminTopic component rendering test', () => {
        act(() => {
            render(<Provider store={mockStore}><AdminTopic {...mockProps}/></Provider>, container)
        })
        expect(container.querySelector('.inputCreator').getAttribute('value')).toBe(mockProps.name)
        expect(container.querySelector('.inputCreator').getAttribute('value')).toBe(mockProps.name)
        for (let i = 0; i < container.querySelectorAll('.tag').length - 1; i++) {
            expect(container.querySelectorAll('.tag')[i].textContent).toBe(mockProps.tags[i].tag)
        }
    })

})