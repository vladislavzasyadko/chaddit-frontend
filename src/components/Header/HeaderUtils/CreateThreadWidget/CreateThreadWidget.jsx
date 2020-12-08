import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import C from "./CreateThreadWidget.module.css";
import {connect, useDispatch} from "react-redux";
import useClickOutside from "../utils";
import {createThread, fetchThreads} from "../../../../redux/reducers/threadReducer";
import {createTopic, createTopicId, fetchTopics, setTopicId} from "../../../../redux/reducers/topicReducer";

function CreateThreadWidget(props) {
    const dispatch = useDispatch()

    const [threadName, setThreadName] = useState('')
    const [threadText, setThreadText] = useState('')
    const [topicTitle, setTopicTitle] = useState('')

    const topics = props.topics.map( topic => ({title: topic.topic_title, id: topic.topic_id}))

    useEffect(() => {
        dispatch(fetchTopics())
    },[])

    const topic = 'Python';

    let domNode = useClickOutside(() => {
        props.closeCreator();
    });

    function updateThreadText(text){
        setThreadText(text);
    }

    function updateThreadName(name){
        setThreadName(name);
    }

    useEffect(() => {
        dispatch(createThread(props.newTopicId, {
            thread_title: threadName,
            posts: [{
                body: threadText,
            }],
        }))
        setThreadName('');
        setThreadText('');
        setTopicTitle('');
        dispatch(fetchThreads());
        props.closeCreator();
    }, [props.newTopicId])

    function postThread(){
        let obj = topics.find(o => o.title === topicTitle);
        if(obj){
            dispatch(setTopicId(obj.id));
        } else {
            dispatch(createTopicId(topicTitle));
        }
    }

    return ReactDOM.createPortal(
        <div
            className={props.creatorActive ? C.darkBackground : C.darkBackgroundHidden}
        >
            <div ref={domNode} className={C.creatorContainer}>
                <h1>{`Создать новый тред в теме: ${topic}`}</h1>
                <input className={C.dataList}
                       placeholder={'Выберите тему треда'}
                       list={'topiclist'}
                       value={topicTitle}
                       onChange={e => setTopicTitle(e.target.value)}/>
                    <datalist id={'topiclist'}>
                        {topics.map(topic => <option value={topic.title}/>)}
                    </datalist>
                <input className={C.inputCreator } placeholder={'Название треда'} value={threadName} onChange={ e=> updateThreadName(e.target.value)}/>
                <textarea className={C.textareaCreator } placeholder={'Сообщение'} value={threadText} onChange={ e=> updateThreadText(e.target.value)}/>
                <button className={C.buttonCreator} onClick={postThread}>{'Отправить'}</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

const mapStateToProps = state => ({
    topics: state.topics.topics,
    newTopicId: state.topics.sendTopicId,
})

export default connect(mapStateToProps)(CreateThreadWidget);
