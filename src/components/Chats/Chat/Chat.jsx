import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import {connect, useDispatch} from "react-redux";
import CH from '../Chats.module.css'
import {clearMessages, createMessage, getMessages} from "../../../redux/reducers/chatReducer";
import io from 'socket.io-client'
import {BASE_URL} from "../../../CONSTANTS/API_CONSTANTS";

function Chat(props) {

    const socketRef = useRef()
    socketRef.current = io(BASE_URL);

    useEffect( () => {


        socketRef.current.on('new message', message => {
            setMessages([...messages, message])
        })
    },[])

    const dispatch = useDispatch()
    const currentId = props.currentId;

    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState(props.messages)

    const handleChatCLose = () => {
        dispatch(clearMessages())
        props.closeChat()
    }

    useEffect( () => {
        console.log('sending get msg')
        dispatch(getMessages(props.chatId))
    }, [])

    useEffect( () => {
        console.log(messages)
    }, [messages])

    useEffect( () => {
        setMessages(props.messages)
    }, [props.messages])

    const sendMessage = (event) => {
        event.preventDefault();
        const messageText = inputValue.trim();
        if (messageText) {
            dispatch(createMessage(props.chatId, messageText))
            setMessages(messages => [...messages, {author_id: currentId, body: messageText}])
            setInputValue('')
        }
    }

    return (
        <div className={CH.chat}>
            <div className={CH.chatHeader}>
                <button className={CH.backButton} onClick={handleChatCLose}>Back</button>
                <h2>{props.chatId}{props.currentId}</h2>
            </div>
            <div className={CH.messageList}>
                {messages.map(message => <div
                    className={message.author_id === currentId ? CH.myMessage : CH.personMessage}>{message.body}</div>)}
            </div>

            <form onSubmit={e => sendMessage(e)} className={CH.inputSpace}>
                <input className={CH.messageInput} placeholder={'Введите ваше сообщение...'}
                       onChange={e => setInputValue(e.target.value)} value={inputValue}/>
                <button className={CH.sendButton}>Send</button>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    currentId: state.user.userId,
    chats: state.chats,
    messages: state.chats.messages,
})

export default connect(mapStateToProps)(Chat);