/* istanbul ignore file */

import axios from 'axios';
import {BASE_URL, PROXY_HOST, PROXY_PORT} from '../CONSTANTS/API_CONSTANTS';

const config = BASE_URL ? {baseURL: BASE_URL} : {baseURL: '/api/',
    proxy: {
        protocol: 'http',
        host: PROXY_HOST,
        port: PROXY_PORT
    }}
let instance = axios.create(config)

export const threadAPI = {
    getThreads() {
        return instance.get(`chaddit/c/search/threads`).then(response => response.data);
    },
    getThreadByTopic(topicId) {
        return instance.get(`chaddit/c/threads`, {
            headers: {
                'topic-id': topicId
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
                'api-token': localStorage.getItem('api_token'),
                'topic-id': topicId,
            }
        }).then(response => response.data);
    },
    deleteThread(threadId) {
        return instance.patch(`chaddit/c/thread/${threadId}`, {active: false}, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        }).then(response => response.data)
    },
    updateThread(threadId, thread) {
        return instance.patch(`chaddit/c/thread/${threadId}`, thread, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        }).then(response => response.data)
    },
}

export const topicAPI = {
    getTopics(desc, order) {
        const params = desc ? {orderbydesc: order} : {orderby: order};
        return instance.get(`chaddit/c/topics`, {params: {...params, limit: 0} }).then(response => response.data);
    },
    getTopicByTag(tag, desc, order) {
        const ordr = desc ? {orderbydesc: order} : {orderby: order};
        const params = tag ? {query: '"' + `#${tag}` + '"', ...ordr} : {}
        return instance.get(`chaddit/c/search/topic`, {params: params}).then(response => response.data);
    },
    searchTopics(name) {
        const params = name ? {query: '"' + name + '"'} : {}
        return instance.get(`chaddit/c/search/topic`, {params: params}).then(response => {
            return response.data
        });
    },
    createTopic(title, tags) {
        return instance.post(`chaddit/c/topic`, {topic_title: title, tags: tags}, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        })
            .then(response => response.data)
    },
    deleteTopic(topicId) {
        return instance.patch(`chaddit/c/topic/${topicId}`, {active: false}).then(response => response.data)
    },
    updateTopic(topicId, topic) {
        return instance.patch(`chaddit/c/topic/${topicId}`, topic, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        }).then(response => response.data)
    },

}

export const chatAPI = {
    getChats() {
        return instance.get(`chaddit/c/chats`, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        }).then(response => {
            return response.data
        });
    },
    getChat(chatId) {
        return instance.get(`chaddit/c/chat/${chatId}`).then(response => response.data);
    },
    createChat(topicId) {
        return instance.post('chaddit/c/chat', {'topic-id': topicId}, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        }).then(response => {
            return response.data
        })
    },
    getMessages(chatId) {
        return instance.get(`chaddit/c/messages/${chatId}`, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            },
            params: {
                limit: 0
            }
        }).then(response => {
            return response.data
        });
    },
    createMessage(chatId, body) {
        return instance.post('chaddit/c/message', {body: body}, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
                'chat-id': chatId,
            }
        }).then(response => {
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
        return instance.get('chaddit/c/user', {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        });
    },
    updateName(name) {
        return instance.patch(`chaddit/c/user`,
            {user_name: name},
            {
                headers: {
                    'api-token': localStorage.getItem('api_token'),
                }
            });
    },
    updatePass(oldPassword, newPassword) {
        return instance.patch('chaddit/c/user',
            {user_pass: newPassword, old_user_pass: oldPassword},
            {
                headers: {
                    'api-token': localStorage.getItem('api_token'),

                }
            });
    }
}

export const postAPI = {
    sendPost(newPost) {
        return instance.post(`chaddit/c/post`, {body: newPost.body}, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
                'thread-id': newPost.threadId,
                'post-id': newPost.rootPostId,
            }
        })
            .then(response => response.data)
    }
}

export const adminAPI = {
    getUsers() {
        return instance.get('chaddit/c/users', {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        }).then(response => {
            return response.data
        })
    },
    updateUser(userId, user) {
        return instance.patch(`chaddit/c/user/${userId}`, user, {
            headers: {
                'api-token': localStorage.getItem('api_token'),
            }
        }).then(response => response.data)
    }


}
