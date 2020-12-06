import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import C from "./CreateTopicWidget.module.css";
import {connect, useDispatch} from "react-redux";
import useClickOutside from "../utils";

function CreateTopicWidget(props) {
    const dispatch = useDispatch()

    const topic = 'Python';

    let domNode = useClickOutside(() => {
        props.closeCreator();

    });

    return ReactDOM.createPortal(
        <div
            className={props.creatorActive ? C.darkBackground : C.darkBackgroundHidden}
        >
            <div ref={domNode} className={C.creatorContainer}>
                <h1>{`Создать новый тред в теме: ${topic}`}</h1>
                <input className={C.inputCreator } placeholder={'Название треда'}/>
                <textarea className={C.textareaCreator } placeholder={'Сообщение'}/>
                <button className={C.buttonCreator}>{'Отправить'}</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(CreateTopicWidget);
