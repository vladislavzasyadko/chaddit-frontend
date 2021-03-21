import {FETCH_TOPICS, UPDATE_TOPIC} from './types.js'
import {topicAPI} from "../../api/api";
import {CREATE_TOPIC, GET_TOPICS_BY_TAG, SEARCH_TOPICS, SET_SEND_TOPIC_ID} from "./types";

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
        case GET_TOPICS_BY_TAG:
            return {
                ...state,
                topics: action.topics,
            }
        case SEARCH_TOPICS:
            return {
                ...state,
                topics: action.topics,
            }
        case UPDATE_TOPIC:
            return {
                ...state,
            }
        case CREATE_TOPIC:
            return {
                ...state,
                sendTopicId: action.id,
                topics: [action.topic, ...state.topics],
            }
        case SET_SEND_TOPIC_ID:
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

export const getTopic = (tag) => (dispatch) => {
    return topicAPI.getTopicByTag(tag)
        .then(topics => dispatch({type: FETCH_TOPICS, topics}));
}

export const searchTopics = (name) => (dispatch) => {
    return topicAPI.searchTopics(name)
        .then(topics => dispatch({type: SEARCH_TOPICS, topics}));
}

export const createTopicId = (title, tags) => (dispatch) => {
    console.log('ttaaggg', tags)
    return topicAPI.createTopic(title, tags)
        .then(topic => dispatch({type: CREATE_TOPIC, id: topic.topic_id, topic:topic}))
}

export const setTopicId = (id) => (dispatch) => {
    return dispatch({type: SET_SEND_TOPIC_ID, id: id})
}

export const updateTopic = (id, topic) => (dispatch) => {
    return topicAPI.updateTopic(id, topic).then( response => dispatch({type: UPDATE_TOPIC}))
}


