import {FETCH_TOPICS} from './types.js'
import {topicAPI} from "../../api/api";
import {CREATE_TOPIC, FETCH_TOPIC} from "./types";

const initialState = {
    topics: []
}

export const topicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOPICS:
            return {
                ...state,
                topics: action.topics,
            }
        case FETCH_TOPIC:
            return {
                ...state,
                topics: [state.topics, action.topic]
            }

        default:
            return state;
    }

}

export const fetchTopicsThunkCreator = () => (dispatch) => {
    return topicAPI.getTopics()
        .then(topics => dispatch({type: FETCH_TOPICS, topics: topics}))
}

export const fetchTopicThunkCreator = (topicId) => {
    return dispatch => {
        topicAPI.getTopic(topicId)
            .then(topic => dispatch({type: FETCH_TOPIC, topic: topic}))
    }
}

export const createTopicThunkCreator = (topicId) => {
    return dispatch => {
        topicAPI.getTopic(topicId)
            .then(topic => dispatch({type: CREATE_TOPIC, topic: topic}))
    }
}
