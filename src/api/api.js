import axios from 'axios';
import {BASE_URL} from '../CONSTANTS/API_CONSTANTS';

let instance = axios.create({
    baseURL: BASE_URL,
})

export const topicAPI = {
    getTopics() {
        return instance.get(`chaddit/c/topics`).then(response => response.data);
    },
    getTopic(topicId){
        return instance.get(`chaddit/c/topic/${topicId}`).then(response => response.data);
    },
    createTopic(){
        return instance.post(`chaddit/c/topic`).then(response => response.data);
    }
}

export const chatAPI = {
    getChats(userId) {
        return instance.get(`/chaddit/c/chats/${userId}`).then(response => response.data);
    },
    getChat(chatId) {
        return instance.get(`/chaddit/c/chat/${chatId}`).then(response => response.data);
    }
}