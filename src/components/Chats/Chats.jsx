import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import useClickOutside from "../Header/HeaderUtils/utils";
import {connect, useDispatch} from "react-redux";
import CH from './Chats.module.css'
import Chat from "./Chat/Chat";
import {createChat, getChats} from "../../redux/reducers/chatReducer";
import {setUserName} from "../../redux/reducers/userReducer";

const const_chats = [{id: 1, name: 'kek', topic: 'kok'}, {id: 2, name: 'tinkoff', topic: 'сотку верни'},
    {
        id: 3, name: 'Мишаэ', topic: 'флюттер'
    }, {id: 4, name: 'КУрсач', topic: 'давай завтра'}, {id: 5, name: 'kek', topic: 'kok'}, {
        id: 6,
        name: 'kek',
        topic: 'kok'
    },
    {
        id: 7, name: 'kek', topic: 'kok'
    }, {id: 8, name: 'kek', topic: 'kok'}, {id: 9, name: 'kek', topic: 'kok'}, {id: 10, name: 'kek', topic: 'kok'},]

function Chats(props) {

    const dispatch = useDispatch()

    const [chats, setChats] = useState(props.chats)

    const [chatOpen, setChatOpen] = useState('')

    const [userNames, setUserNames] = useState([])

    const [chatTopic, setChatTopic] = useState('')
    const[noTopicChosen, setNoTopicChosen] = useState(false)


    const deleteChat = (id) => {
        setChats(chats => chats.filter(chat => {
            return chat.chat_id !== id
        }))
    }

    const openChat = (id, names) => {
        setChatOpen(id)
        setUserNames(names)
    }

    const closeChat = () => {
        setChatOpen('')
    }

    const handleCreateChat = () => {
        if(chatTopic){
            setNoTopicChosen(false)
            dispatch(createChat(parseInt(chatTopic)))
        }else {
            setNoTopicChosen(true)
        }

    }

    useEffect( () => {
        dispatch(getChats())
    }, [])

    useEffect( () => {
        setChats(props.chats)
    }, [props.chats])

    let domNode = useClickOutside(() => {
        dispatch(getChats())
        props.closeChats();
    });

    const getTopicNameById = (id) => {
        const found = props.topics.filter(topic => topic.topic_id === id)
        console.log('found', found)
        return found[0]
    }

    return ReactDOM.createPortal(
        <div className={props.chatsActive ? CH.darkBackground : CH.darkBackgroundHidden}
        >
            <div className={CH.creatorContainer} ref={domNode}>
                {!chatOpen && <div className={CH.chatGrid}>
                    <div className={CH.chatsHeader}>
                        <h1>Чаты мои чаты</h1>
                        <div className={CH.chatCreateContainer}>
                            <label className={noTopicChosen ? CH.redLabel : CH.label} htmlFor={'chatTopic'}>Выбери тему нового чата</label>
                        <select id={'chatTopic'} className={CH.topicSelect} onChange={e => setChatTopic(e.target.value)}>
                            {props.topics.map(topic => <option value={topic.topic_id}>{topic.topic_title}</option>)}
                        </select>
                        <button className={CH.sendButton} onClick={handleCreateChat}> Создать чат </button>
                        </div>
                    </div>
                    <div className={CH.chats}>
                    {chats.slice(0).reverse().map(chat => <ChatElement
                        name={chat.participants
                            .map(user => user.user_name)} id={chat.chat_id} topic={getTopicNameById(chat.topic_id)}
                                                    deleteChat={deleteChat} openChat={openChat}/>)}
                    </div>
                </div>}
                {chatOpen && <Chat closeChat={closeChat} chatId={chatOpen} names={userNames}/>}
            </div>


        </div>,
        document.getElementById("portal")
    )
}

const ChatElement = (props) => {
    const handleDeleteClick = (event) => {
        props.deleteChat(props.id)
        event.stopPropagation()
    }

    const handleOpenChat = () => {
        props.openChat(props.id, props.name.reduce((acc, curr) => acc ? acc + ' и ' + curr : acc + curr, ''))
    }

    return (
        <div className={CH.chatElement} onClick={handleOpenChat}>
            <div>
                <h3>{'Комната: '}{props.id}{' на тему: '}{props.topic?.topic_title}</h3>
                <h3>{props.name.reduce((acc, curr) => acc ? acc + ' и ' + curr : acc + curr, '')}</h3>
            </div>
            {/*<button className={CH.closeButton} onClick={handleDeleteClick}>Delete</button>*/}
        </div>)
}


const mapStateToProps = (state) => ({
    currentId: state.user.userId,
    chats: state.chats.chats,
    topics: state.topics.topics,
})

export default connect(mapStateToProps)(Chats);