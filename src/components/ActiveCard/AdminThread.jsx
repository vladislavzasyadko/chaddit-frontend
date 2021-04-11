import React, {useState} from "react";
import ReactDOM from "react-dom";
import useClickOutside from "../Header/HeaderUtils/utils";
import {connect, useDispatch} from "react-redux";
import AT from '../Topics/Topic/Topic.module.css';
import AdT from './AdminThread.module.css';
import C from "../Header/HeaderUtils/CreateThreadWidget/CreateThreadWidget.module.css";
import {deleteThread, updateThread} from "../../redux/reducers/threadReducer";
/* istanbul ignore file */
function AdminThread(props) {

    const dispatch = useDispatch()

    const [threadName, setThreadName] = useState(props.info.thread_title);
    const [filebyteArray, setFileByteArray] = useState(props.info.image);
    const [loadStatus, setLoadStatus] = useState(false);

    let domNode = useClickOutside(() => {
        props.closeThread();
    });

    function updateImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            setFileByteArray(reader.result)
            setLoadStatus(true)
        }
        reader.readAsDataURL(file);
    }

    const handleUpdateThread = () => {
        const updatedThread = {
             thread_title: threadName ?? props.info.thread_title,
             image: filebyteArray
        }
        dispatch(updateThread(props.info.thread_id, updatedThread))
    }

    const handleDeleteThread = () => {
        dispatch(deleteThread(props.info.thread_id))
        props.closeThread();
    }

    return ReactDOM.createPortal(
        <div className={AdT.darkBackground}
        >
            <div className={AdT.adminThread} ref={domNode}>
                <div className={AT.adminHeader}><h1>{'Информация о треде'}</h1>
                    <div>
                        <button className={AT.saveButton} onClick={handleUpdateThread}>{'Сохранить'}</button>
                        <button className={AT.deleteTopicButton} onClick={handleDeleteThread}>{'Удалить'}</button>
                    </div>
                </div>
                <div className={AdT.adminThreadContainer}>
                    <div className={AdT.adminThreadControls}>
                        <div className={AdT.adminThreadName}>
                            <label htmlFor={'threadName'}>{'Название треда'}</label>
                            <input id={'threadName'} className={C.inputThread}
                                   value={threadName}
                                   onChange={e => setThreadName(e.target.value)}/>
                        </div>
                        <div>
                            <input id={'imageUpdate'} className={C.inputFile} type={'file'}
                                   onChange={e => updateImageFileAsURL(e.target)}/>
                            <label htmlFor={'imageUpdate'}
                                   className={loadStatus ? C.loadButtonDone : C.loadButton}>
                                {loadStatus ? 'Картинка загружена' : 'Загрузить картинку'}</label>
                        </div>
                    </div>
                    <div>
                        <img className={AdT.adminThreadImage} alt={'#'}
                             src={filebyteArray} height={300} width={300} style={{objectFit: 'cover'}}/>
                    </div>

                </div>


            </div>


        </div>,
        document.getElementById("portal")
    )
}

const mapStateToProps = (state) => ({
    currentId: state.user.userId,
})

export default connect(mapStateToProps)(AdminThread);