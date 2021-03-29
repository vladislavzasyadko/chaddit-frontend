import React, {useEffect, useRef, useState} from "react";
import {connect, useDispatch} from "react-redux";
import CH from '../Chats.module.css'
import {clearMessages, createMessage, getMessages, receiveMessage} from "../../../redux/reducers/chatReducer";
import io from 'socket.io-client';
import {BASE_URL} from "../../../CONSTANTS/API_CONSTANTS";

function Chat(props) {

    const [, setSocket] = useState()

    useEffect(() => {
        handleSocket();
    }, []);

    const handleSocket = () => {
        const lobby = io(BASE_URL);
        lobby.on('new message', function (msg) {
            if (messages.filter(message => message.message_id === msg.message_id).length === 0) {
                dispatch(receiveMessage(msg));
            }
        });

    };


    const dispatch = useDispatch()
    const currentId = props.currentId;

    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState([])

    const handleChatCLose = () => {
        setSocket(null)
        dispatch(clearMessages())
        props.closeChat()
    }

    useEffect(() => {
        dispatch(getMessages(props.chatId))
    }, [])

    useEffect(() => {
        const uniqueArray = props.messages.filter((msg, index) => {
            return index === props.messages.findIndex(obj => {
                return obj.message_id === msg.message_id;
            });
        }).sort((a, b) => a.message_id - b.message_id);
        setMessages(uniqueArray)
    }, [props.messages])

    const sendMessage = (event) => {
        event.preventDefault();
        const messageText = inputValue.trim();
        if (messageText) {
            dispatch(createMessage(props.chatId, messageText))
            setInputValue('')
        }

    }
    const lastMessageRef = useRef()

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({smooth: true})
        }

    }, [lastMessageRef.current])

    return (
        <div className={CH.chat}>
            <div className={CH.chatHeader}>
                <button className={CH.backButton} onClick={handleChatCLose}>Back</button>
                <h2>Комната {props.names}</h2>
            </div>
            <div className={CH.messageList}>
                {messages.map((message, index) => {
                    const lastMessage = messages.length - 1 === index
                    return <div key={`message_from_${message.author_id}_number_${index}`}
                                ref={lastMessage ? lastMessageRef : null}
                                className={message.author_id === currentId
                                    ? CH.myMessage
                                    : CH.personMessage}>{message.body}</div>
                })}
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
    messages: state.chats.messages,
})

export default connect(mapStateToProps)(Chat);