import axios from 'axios';
import {BASE_URL} from '../CONSTANTS/API_CONSTANTS';

let instance = axios.create({
    baseURL: BASE_URL,
})

export const threadAPI = {
    getThreads() {
        return instance.get(`chaddit/c/search/threads`).then(response => response.data);
    },
    getThreadByTopic(topicId) {
        return instance.get(`chaddit/c/threads`, {
            headers: {
                topic_id: topicId
            }
        }).then(response => response.data);
    },
    searchThread(name) {
        const params = name ? {query: '"' + `${name}` + '"'} : {}
        return instance.get(`chaddit/c/search/thread`, {params: params}).then(response => response.data);
    },
    getThread(threadId) {
        return instance.get(`chaddit/c/thread/${threadId}`).then(response => response.data);
    },
    createThread(topicId, data) {
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
    getTopicByTag(tag) {
        const params = tag ? {query: '"' + `#${tag}` + '"'} : {}
        return instance.get(`chaddit/c/search/topic`, {params: params}).then(response => response.data);
    },
    searchTopics(name) {
        const params = name ? {query: '"' + `${name}` + '"'} : {}
        return instance.get(`chaddit/c/search/topic`, {params: params}).then(response => response.data);
    },
    createTopic(title, tags) {
        console.log('post tags', tags)
        return axios.post(BASE_URL + `chaddit/c/topic`, {topic_title: title, tags: tags}, {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            }
        })
            .then(response => response.data)
    }
}

export const chatAPI = {
    getChats() {
        return instance.get(`chaddit/c/chats`, {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            }
        }).then(response => {
            console.log(response)
            return response.data
        });
    },
    getChat(chatId) {
        return instance.get(`chaddit/c/chat/${chatId}`).then(response => response.data);
    },
    createChat() {
        return instance.post('chaddit/c/chat', {}, {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            }
        }).then(response => {
            console.log(response)
            return response.data
        })
    },
    getMessages(chatId) {
        return instance.get(`chaddit/c/messages/${chatId}`, {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            },
            params: {
            limit: -1
        }
        }).then(response => {
            console.log('message response', response)
            return response.data
        });
    },
    createMessage(chatId, body){
        return instance.post('chaddit/c/message', {body: body},{
            headers: {
                'api_token': localStorage.getItem('api_token'),
                'chat_id': chatId,
            }
        }).then(response => {
            console.log(response)
            return response.data
        })

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
    getUser() {
        return axios.get(BASE_URL + 'chaddit/c/user', {
            headers: {
                'api_token': localStorage.getItem('api_token'),
            }
        });
    },
    updateName(name) {
        return axios.patch(`${BASE_URL}chaddit/c/user`,
            {user_name: name},
            {
                headers: {
                    'api_token': localStorage.getItem('api_token'),
                }
            });
    },
    updatePass(oldPassword, newPassword) {
        return axios.patch(BASE_URL + 'chaddit/c/user',
            {user_pass: newPassword, old_user_pass: oldPassword},
            {
                headers: {
                    'api_token': localStorage.getItem('api_token'),

                }
            });
    }
}

export const postAPI = {
    sendPost(newPost) {
        return axios.post(BASE_URL + `chaddit/c/post`, {body: newPost.body}, {
            headers: {
                'api_token': localStorage.getItem('api_token'),
                'thread_id': newPost.threadId,
                'post_id': newPost.rootPostId,
            }
        })
            .then(response => response.data)
    }
}