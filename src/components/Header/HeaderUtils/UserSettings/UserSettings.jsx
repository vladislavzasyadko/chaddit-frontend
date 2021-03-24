import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import U from "./UserSettings.module.css";
import {logoutActionCreator} from "../../../../redux/reducers/authReducer";
import {connect, useDispatch} from "react-redux";
import {getUser, updateUserName, updateUserPass} from "../../../../redux/reducers/userReducer";
import useClickOutside from "../utils";
import {SUCCESS} from "../../../../redux/reducers/types";

function UserSettings(props) {
    const [passView, setPassView] = useState(false)

    useEffect(
        () => {
            dispatch(getUser());
        },
        [props.isAuth],
    );

    useEffect(() => {
        let newStatus = 'Изменить пароль';
        if(props.userPassStatus){
            newStatus = props.userPassStatus === SUCCESS ? 'Пароль изменен!' : 'Попробуйте снова'
        }
        setStatus(newStatus)
    }, [props.userPassStatus])

    const [name, setName] = useState('')
    const [nameStatus, setNameStatus] = useState('Изменить имя')
    const [status, setStatus] = useState('')

    const [oldPassword, setOldPass] = useState('')
    const [password, setPass] = useState('')
    const dispatch = useDispatch()

    function logout(){
        props.closeSettings();
        dispatch(logoutActionCreator());
    }

    function setNewUserName(){
        if(name && !name.includes('#')){
            dispatch(updateUserName(name));
            setName('')
            setNameStatus('Изменить имя')
        } else {
            setNameStatus('Введите корректное имя')
        }
    }

    function updateUserPassword(){
        if(oldPassword && password){
        dispatch(updateUserPass(oldPassword, password))
        setOldPass('')
        setPass('')
        setStatus('Проверяем...')
        } else {
            setStatus('Введите корректный пароль')
        }
    }

    let domNode = useClickOutside(() => {
        props.closeSettings();
        setName('');
        setPass('');
        setOldPass('');
    });

    return ReactDOM.createPortal(
        <div
            className={props.settingsActive ? U.darkBackground : U.darkBackgroundHidden}
        >
            <div ref={domNode} className={props.settingsActive ? U.settings : U.settingsHidden}>
                <div>{`${props.isAuth ? `Здравствуйте, ${props.userName}` : ''}`}</div>
                <div style={{ marginTop: "100px" }}>Почта {props.userEmail}</div>
                <div>
                    <div className={U.userInputContainer}>
                        <input
                            className={U.userInput}
                            type={"text"}
                            placeholder={`${props.userName}#${props.userTag}`}
                            value={name}
                            onChange={e => {
                                setName(e.target.value)
                                setNameStatus('Изменить имя')
                            }}
                        />
                    </div>
                    <button className={U.userButton} onClick={setNewUserName}>{nameStatus}</button>
                </div>
                <div>
                    <div className={U.userInputContainer}>
                        <input
                            className={U.userInput}
                            type={passView ? "text": "password"}
                            placeholder={"Старый пароль"}
                            value={oldPassword}
                            onChange={e => {
                                setOldPass(e.target.value.trim())
                                setStatus('Изменить пароль')
                            }}
                        />
                    </div>
                    <div className={U.userInputContainer}>
                        <input
                            className={U.userInput}
                            type={passView ? "text": "password"}
                            placeholder={"Новый пароль"}
                            value={password}
                            onChange={e => {
                                setPass(e.target.value.trim())
                                setStatus('Изменить пароль')
                            }}
                        />
                    </div>
                    <div className={U.userPassStatusOption}>
                        <input className={U.userPassStatusCheck} type="checkbox" checked={passView} onClick={e => setPassView(e.target.checked)}/>
                        <p className={U.userPassStatusText}>{"Показать пароль"}</p>
                    </div>

                    <button className={U.userButton} onClick={updateUserPassword}>{status}</button>
                </div>
                {/*<div>*/}
                {/*    <button className={U.userButton}>*/}
                {/*        Изменить фотографию*/}
                {/*    </button>*/}
                {/*</div>*/}
                <button className={U.exitButton} onClick={e => logout()}>Выйти из аккаунта</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

const mapStateToProps = state => ({
    userName: state.user.userName,
    userPassStatus: state.user.userPassStatus,
    userEmail: state.user.userEmail,
    userTag: state.user.userTag,
    userPass: state.user.userPass,
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(UserSettings);
