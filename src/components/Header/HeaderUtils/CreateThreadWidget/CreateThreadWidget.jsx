import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import C from "./CreateThreadWidget.module.css";
import {connect, useDispatch} from "react-redux";
import useClickOutside from "../utils";
import {createThread, fetchThreads} from "../../../../redux/reducers/threadReducer";

function CreateThreadWidget(props) {
    const dispatch = useDispatch()

    const [threadName, setThreadName] = useState('')
    const [threadText, setThreadText] = useState('')

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

    function postThread(){
        dispatch(createThread(6, {
            thread_title: threadName,
            posts: [{
                body: threadText,
            }],
        }))
        setThreadName('');
        setThreadText('');
        dispatch(fetchThreads());
        props.closeCreator();
    }

    return ReactDOM.createPortal(
        <div
            className={props.creatorActive ? C.darkBackground : C.darkBackgroundHidden}
        >
            <div ref={domNode} className={C.creatorContainer}>
                <h1>{`Создать новый тред в теме: ${topic}`}</h1>
                <input className={C.inputCreator } placeholder={'Название треда'} onChange={ e=> updateThreadName(e.target.value)}/>
                <textarea className={C.textareaCreator } placeholder={'Сообщение'} onChange={ e=> updateThreadText(e.target.value)}/>
                <button className={C.buttonCreator} onClick={postThread}>{'Отправить'}</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(CreateThreadWidget);
