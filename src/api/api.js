import axios from 'axios';
import {BASE_URL} from '../CONSTANTS/API_CONSTANTS';

let instance = axios.create({
    baseURL: BASE_URL,
})

export const threadAPI = {
    getThreads() {
        return instance.get(`chaddit/c/threads`,{
        headers: {
            topic_id: 6
        }}).then(response => response.data);
    },
    getThread(threadId){
        return instance.get(`chaddit/c/thread/${threadId}`).then(response => response.data);
    },
    createThread(topicId, data){
        return instance.post(`chaddit/c/thread`, data, {
            headers: {
                'api_token': localStorage.getItem('api_token'),
                'topic_id': topicId,
            }
        }).then(response => response.data);
    }
}

export const topicAPI = {
    getTopics() {
        return instance.get(`chaddit/c/topics`).then(response => response.data);
    },
    createTopic(title){
        return axios.post(BASE_URL + `chaddit/c/topic`, {topic_title: title, tags: []}, {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            }
        })
            .then(response => response.data)
    }
}

export const chatAPI = {
    getChats(userId) {
        return instance.get(`chaddit/c/chats/${userId}`).then(response => response.data);
    },
    getChat(chatId) {
        return instance.get(`chaddit/c/chat/${chatId}`).then(response => response.data);
    }
}

export const loginAPI = {
    login(email, password) {
        return instance.post('chaddit/c/login',
            {user_email: email, user_pass: password})
    },
    register(name, email, password) {
        return instance.post('chaddit/c/register',
            {user_name: name, user_email: email, user_pass: password}) //
    }
}

export const userAPI = {
    getUser(){
        return axios.get(BASE_URL + 'chaddit/c/user', {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            }
        });
    },
    updateName(name) {
        console.log('api key', localStorage.getItem('api_token'));
        return axios.patch(`${BASE_URL}chaddit/c/user`,
            {user_name: name},
            {
                headers: {
                    'api_token': localStorage.getItem('api_token'),
                }
            });
    },
    updatePass(password){
        console.log(localStorage.getItem('api_token'));
        return axios.get(BASE_URL  + 'chaddit/c/user', {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            },
            data: {user_pass: password}
        });
    }
}