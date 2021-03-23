import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import useClickOutside from "../Header/HeaderUtils/utils";
import {connect, useDispatch} from "react-redux";
import CH from '../Chats/Chats.module.css'
import AT from '../Topics/Topic/Topic.module.css'
import C from "../Header/HeaderUtils/CreateThreadWidget/CreateThreadWidget.module.css";
import {clearThread} from "../../redux/reducers/threadReducer";
import {clearPosts} from "../../redux/reducers/postsReducer";

function AdminThread(props) {

    const dispatch = useDispatch()

    const [chats, setChats] = useState(props.chats)

    const [chatOpen, setChatOpen] = useState('')

    const [topicName, setTopicName] = useState(props.name)
    const [topicTags, setTopicTags] = useState(props.tags)
    const [tagField, setTagField] = useState('')
    const [deletePress, setDeletePress] = useState(false)


    // const handleDeleteTopic = () => {
    //     dispatch(updateTopic(props.topicId, {active:false}))
    //     setDeletePress(true);
    // }
    //
    // let domNode = useClickOutside(() => {
    //     dispatch(fetchTopics())
    //     props.closeTopic();
    // });

    // const addTag = () => {
    //     const tagName = tagField.trim()
    //     if (tagName && !tagName.includes('#')) {
    //         setTopicTags(tags => [...tags, {tag: tagName}])
    //         setTagField('')
    //     }
    // }
    //
    // const saveTopic = () => {
    //     if(topicName.trim())
    //         dispatch(updateTopic(props.topicId, {
    //             topic_title: topicName.trim(),
    //             tags: topicTags
    //         }))
    // }
    let domNode = useClickOutside(() => {
        dispatch(clearThread());
        dispatch(clearPosts());
        props.closeActiveCard();
    });


    return ReactDOM.createPortal(
        <div className={props.active ? CH.darkBackground : CH.darkBackgroundHidden}
        >
            <div className={AT.adminTopic} ref={domNode}>
                <div className={AT.adminHeader}><h1>topic info{props.info}</h1>
                    <div>
                        <button disabled={deletePress} className={AT.saveButton} > Сохранить</button>
                        <button disabled={deletePress} className={AT.deleteTopicButton} > Удалить </button>
                    </div>
                </div>

                <input disabled={deletePress} className={C.inputCreator} onChange={e => setTopicName(e.target.value)} value={topicName}/>
                <input disabled={deletePress} className={C.inputCreator}
                       placeholder={'Введите тег'} value={tagField}
                       onChange={e => setTagField(e.target.value)}/>
                <div className={C.tagFormContainer}>
                    <button  disabled={deletePress} className={C.addTagButton} >{'Добавить'}</button>

                </div>
                <div className={AT.tagsContainer}>{topicTags.map(tag => <div
                    className={C.tag}>{tag.tag}</div>)}
                </div>


            </div>


        </div>,
        document.getElementById("portal")
    )
}

const mapStateToProps = (state) => ({
    currentId: state.user.userId,
    chats: state.chats.chats,
})

export default connect(mapStateToProps)(AdminThread);