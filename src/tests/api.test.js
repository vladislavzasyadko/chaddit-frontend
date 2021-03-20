import {chatAPI, threadAPI, topicAPI} from "../api/api";


test('getThreads() request/response test', () =>{
    return threadAPI.getThreads().then(data => {
        data.forEach((thread) => {
            expect(thread).toHaveProperty('active', true)

            expect(thread).toHaveProperty('author')
            expect(typeof thread.author).toBe('object')

            expect(thread).toHaveProperty('author_id')
            expect(typeof thread.author_id).toBe('number')

            expect(thread).toHaveProperty('created_at')
            expect(typeof thread.created_at).toBe('string')

            expect(thread).toHaveProperty('image')
            expect(typeof thread.image === 'string' || typeof thread.image === 'object').toBeTruthy()

            expect(thread).toHaveProperty('posts')
            expect(typeof thread.posts).toBe('object')

            expect(thread).toHaveProperty('posts_count')
            expect(typeof thread.posts_count).toBe('number')

            expect(thread).toHaveProperty('thread_id')
            expect(typeof thread.thread_id).toBe('number')

            expect(thread).toHaveProperty('thread_title')
            expect(typeof thread.thread_title).toBe('string')

            expect(thread).toHaveProperty('topic_id')
            expect(typeof thread.topic_id).toBe('number')

            expect(thread).toHaveProperty('updated_at')
            expect(typeof thread.updated_at).toBe('string')

            expect(thread).toHaveProperty('views')
        })
    })
})

test('getTopics() request/response test', () => {
    return topicAPI.getTopics().then(data => {
        data.forEach((topic) => {
            expect(topic).toHaveProperty('active', true)

            expect(topic).toHaveProperty('author')
            expect(typeof topic.author).toBe('object')

            expect(topic).toHaveProperty('author_id')
            expect(typeof topic.author_id).toBe('number')

            expect(topic).toHaveProperty('created_at')
            expect(typeof topic.created_at).toBe('string')

            expect(topic).toHaveProperty('image')
            expect(typeof topic.image).toBe('object')

            expect(topic).toHaveProperty('tags')
            expect(typeof topic.tags).toBe('object')

            expect(topic).toHaveProperty('threads_count')
            expect(typeof topic.threads_count).toBe('number')

            expect(topic).toHaveProperty('topic_id')
            expect(typeof topic.topic_id).toBe('number')

            expect(topic).toHaveProperty('topic_title')
            expect(typeof topic.topic_title).toBe('string')

            expect(topic).toHaveProperty('updated_at')
            expect(typeof topic.updated_at).toBe('string')
        })
    })
})

test('getChats() request/response test', () => {
    return chatAPI.getChats().then(data => {
        data.forEach((chat) => {
            expect(chat).toHaveProperty('active', true)

            expect(chat).toHaveProperty('chat_id')
            expect(typeof chat.chat_id).toBe('number')

            expect(chat).toHaveProperty('created_at')
            expect(typeof chat.created_at).toBe('string')

            expect(chat).toHaveProperty('full')
            expect(typeof chat['full']).toBe('boolean')

            expect(chat).toHaveProperty('participants')
            expect(typeof chat.participants).toBe('object')

            expect(chat).toHaveProperty('topic_id')
            expect(typeof chat.topic_id === 'number' || typeof chat.topic_id === 'object').toBeTruthy()

            expect(chat).toHaveProperty('updated_at')
            expect(typeof chat.updated_at).toBe('string')
        })
    })
})
