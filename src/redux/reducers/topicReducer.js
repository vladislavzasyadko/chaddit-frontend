import {FETCH_TOPICS} from './types.js'
import {topicAPI} from "../../api/api";
import {CREATE_TOPIC} from "./types";

const initialState = {
    topics: []
}

export const topicReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOPICS:
            return {
                ...state,
                topics: action.topics,
            }
        case CREATE_TOPIC:
            return {
                ...state,
                sendTopicId: action.id,
            }

        default:
            return state;
    }

}

export const fetchTopics = () => (dispatch) => {
    return topicAPI.getTopics()
        .then(topics => dispatch({type: FETCH_TOPICS, topics}));
}

export const createTopicId = (title) => (dispatch) => {
    return topicAPI.createTopic(title)
        .then(topic => dispatch({type: CREATE_TOPIC, id: topic.topic_id}))
}

export const setTopicId = (id) => (dispatch) => {
    return dispatch({type: CREATE_TOPIC, id: id})
}


