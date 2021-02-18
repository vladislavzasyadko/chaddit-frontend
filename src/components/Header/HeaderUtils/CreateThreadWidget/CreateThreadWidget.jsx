import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import C from "./CreateThreadWidget.module.css";
import {connect, useDispatch} from "react-redux";
import useClickOutside from "../utils";
import {createThread, fetchThreads} from "../../../../redux/reducers/threadReducer";
import {createTopicId, fetchTopics, setTopicId} from "../../../../redux/reducers/topicReducer";

function CreateThreadWidget(props) {
    const dispatch = useDispatch()

    const [threadName, setThreadName] = useState('')
    const [tags, setTags] = useState([])
    const [threadText, setThreadText] = useState('')
    const [topicTitle, setTopicTitle] = useState('')
    const [filebyteArray, setFileByteArray] = useState('')

    const topics = props.topics.map(topic => ({title: topic.topic_title, id: topic.topic_id}))

    useEffect(() => {
        dispatch(fetchTopics())
    }, [])

    let domNode = useClickOutside(() => {
        props.closeCreator();
    });

    const addTag = () => {

    }
    const removeTag = (id) => {

    }

    function updateThreadText(text) {
        setThreadText(text);
    }

    function updateThreadName(name) {
        setThreadName(name);
    }

    function encodeImageFileAsURL(element) {
        console.log(element)
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            setFileByteArray(reader.result)
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (threadName && threadText && props.newTopicId) {
            dispatch(createThread(props.newTopicId, {
                thread_title: threadName,
                image: filebyteArray,
                posts: [{
                    body: threadText,
                }],
            }))
            setThreadName('');
            setThreadText('');
            setTopicTitle('');
            props.closeCreator();
        }
    }, [props.newTopicId])

    function postThread() {
        let obj = topics.find(o => o.title === topicTitle);
        if (obj) {
            dispatch(setTopicId(obj.id));
        } else {
            dispatch(createTopicId(topicTitle));
        }
    }

    const handleSubmit = event => {
        postThread();
        event.preventDefault()
    }

    return ReactDOM.createPortal(
        <div
            className={props.creatorActive ? C.darkBackground : C.darkBackgroundHidden}
        >
            <div ref={domNode} className={C.creatorContainer}>
                <h1>{`Создать новый тред в теме:`}</h1>
                <input className={C.dataList}
                       placeholder={'Выберите тему треда'}
                       list={'topiclist'}
                       value={topicTitle}
                       onChange={e => setTopicTitle(e.target.value)}/>
                <datalist id={'topiclist'}>
                    {topics.map((topic, i) => <option key={`topic_item_${i}`} value={topic.title}/>)}
                </datalist>
                <input className={C.inputCreator} placeholder={'Название треда'} value={threadName}
                       onChange={e => updateThreadName(e.target.value)}/>
                <input type={'file'} onChange={e => encodeImageFileAsURL(e.target)}/>
                <textarea className={C.textareaCreator} placeholder={'Сообщение'} value={threadText}
                          onChange={e => updateThreadText(e.target.value)}/>
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
