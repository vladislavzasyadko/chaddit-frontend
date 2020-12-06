import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import U from "./UserSettings.module.css";
import showPass from "../../../../icons/showpass.png";
import {logoutActionCreator} from "../../../../redux/reducers/authReducer";
import {connect, useDispatch} from "react-redux";
import {getUser, updateUserName} from "../../../../redux/reducers/userReducer";
import useClickOutside from "../utils";

function UserSettings(props) {
    const [passView, setPassView] = useState(true)

    useEffect(
        () => {
            dispatch(getUser());
        },
        [props.isAuth],
    );

    const [name, setName] = useState('')
    const [input, setInput] = useState('')
    const [password, setPass] = useState('')
    const dispatch = useDispatch()

    function logout(){
        props.closeSettings();
        dispatch(logoutActionCreator());
    }

    function setNewUserName(){
        dispatch(updateUserName(name));
        setName('')
    }

    let domNode = useClickOutside(() => {
        props.closeSettings();
        setName('');
        setPass('')
    });

    return ReactDOM.createPortal(
        <div
            className={props.settingsActive ? U.darkBackground : U.darkBackgroundHidden}
        >
            <div ref={domNode} className={props.settingsActive ? U.settings : U.settingsHidden}>
                <div style={{ marginTop: "100px" }}>Почта {props.userEmail}</div>
                <div>
                    <div className={U.userInputContainer}>
                        <input
                            className={U.userInput}
                            type={"text"}
                            placeholder={`${props.userName}#${props.userTag}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <button className={U.userButton} onClick={setNewUserName}> Изменить имя </button>
                </div>
                <div>
                    <div className={U.userInputContainer}>
                        <input
                            className={U.userInput}
                            type={passView ? "password" : "text"}
                            placeholder={"Старый пароль"}
                        />
                        <img
                            src={showPass}
                            height={"30px"}
                            onClick={(e) => setPassView(!passView)}
                        />
                    </div>
                    <div className={U.userInputContainer}>
                        <input
                            className={U.userInput}
                            type={passView ? "password" : "text"}
                            placeholder={"Новый пароль"}
                        />
                        <img
                            src={showPass}
                            height={"30px"}
                            onClick={(e) => setPassView(!passView)}
                        />
                    </div>
                    <button className={U.userButton}>Изменить пароль</button>
                </div>
                <div>
                    <button className={U.userButton}>
                        Изменить фотографию
                    </button>
                </div>
                <button className={U.exitButton} onClick={e => logout()}>Выйти из аккаунта</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

const mapStateToProps = state => ({
    userName: state.user.userName,
    userEmail: state.user.userEmail,
    userTag: state.user.userTag,
    userPass: state.user.userPass,
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(UserSettings);
