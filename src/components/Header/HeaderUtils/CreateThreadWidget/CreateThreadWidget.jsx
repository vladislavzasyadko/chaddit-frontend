import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import C from "./CreateThreadWidget.module.css";
import {connect, useDispatch} from "react-redux";
import useClickOutside from "../utils";
import {createThread} from "../../../../redux/reducers/threadReducer";
import {createTopicId, fetchTopics, setTopicId} from "../../../../redux/reducers/topicReducer";
function CreateThreadWidget(props) {
    const dispatch = useDispatch()

    const [threadName, setThreadName] = useState('')
    const [tags, setTags] = useState([])
    const [tagField, setTagField] = useState('')
    const [threadText, setThreadText] = useState('')
    const [topicTitle, setTopicTitle] = useState('')
    const [filebyteArray, setFileByteArray] = useState('')
    const [loadStatus, setLoadStatus] = useState(false)

    const topics = props.topics.map(topic => ({title: topic.topic_title, id: topic.topic_id}))

    useEffect(() => {
        dispatch(fetchTopics())
    }, [])

    /* istanbul ignore next */
    let domNode = useClickOutside(() => {
        setTopicTitle('')
        setThreadText('')
        setThreadName('')
        setTagField('')
        setTags([])
        setFileByteArray('');
        setLoadStatus(false);
        props.closeCreator();
    });

    /* istanbul ignore next */
    const addTag = () => {
        const tagName = tagField.trim()
        if (tagName && !tagName.includes('#')) {
            setTags(tags => [...tags, {tag: tagName}])

        }
        setTagField('')
    }

    function updateThreadText(text) {
        setThreadText(text);
    }

    function updateThreadName(name) {
        setThreadName(name);
    }

    /* istanbul ignore next */
    function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            setFileByteArray(reader.result)
            setLoadStatus(true)
        }
        reader.readAsDataURL(file);
    }

    /* istanbul ignore next */
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

    /* istanbul ignore next */
    function postThread() {
        let obj = topics.find(o => o.title === topicTitle);
        if (obj) {
            dispatch(setTopicId(obj.id));
        } else {
            dispatch(createTopicId(topicTitle, tags));
        }
    }

    return ReactDOM.createPortal(
        <div
            className={props.creatorActive ? C.darkBackground : C.darkBackgroundHidden}
        >
            <div ref={domNode} className={C.creatorContainer}>
                <h1>{`Создать новый тред в теме:`}</h1>
                <input id={'topicName'} className={C.dataList}
                       placeholder={'Выберите тему треда'}
                       list={'topiclist'}
                       value={topicTitle}
                       onChange={e => setTopicTitle(e.target.value)}/>
                <datalist id={'topiclist'}>
                    {topics.map((topic, i) => <option key={`topic_item_${i}`} value={topic.title}/>)}
                </datalist>
                {topicTitle && !topics.find(o => o.title === topicTitle) && <><input className={C.inputCreator}
                                                                      placeholder={'Введите тег'} value={tagField}
                                                                      onChange={e => setTagField(e.target.value)}/>
                    <div className={C.tagFormContainer}>
                        <button className={C.addTagButton} onClick={addTag}>{'Добавить'}</button>
                        <div className={C.tagsContainer}>{tags.map(tag => <div
                            className={C.tag}>{tag.tag}</div>)}
                        </div>
                    </div>
                </>}
                <input id={'threadName'} className={C.inputCreator} placeholder={'Название треда'} value={threadName}
                       onChange={e => updateThreadName(e.target.value)}/>
                <input id={'imageLoad'} className={C.inputFile} type={'file'}
                       onChange={e => encodeImageFileAsURL(e.target)}/>
                <label htmlFor={'imageLoad'}
                       className={loadStatus ? C.loadButtonDone : C.loadButton}>{loadStatus ? 'Картинка загружена' : 'Загрузить картинку'}</label>
                <textarea id={'threadMessage'} className={C.textareaCreator} placeholder={'Сообщение'} value={threadText}
                          onChange={e => updateThreadText(e.target.value)}/>
                <button id={'sendThreadButton'} className={C.buttonCreator} onClick={postThread}>{'Отправить'}</button>
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
