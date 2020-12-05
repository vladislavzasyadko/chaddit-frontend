import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import U from "./UserSettings.module.css";
import showPass from "../../../../icons/showpass.png";
import {logoutActionCreator} from "../../../../redux/reducers/authReducer";
import {connect, useDispatch} from "react-redux";
import {getUser} from "../../../../redux/reducers/userReducer";

const useClickOutside = (handler) => {
    const domNode = useRef();

    useEffect(() => {
        const handleEvent = (event) => {
            if (domNode && !domNode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", handleEvent);

        return () => {
            document.removeEventListener("mousedown", handleEvent);
        };
    });

    return domNode;
};

function UserSettings(props) {
    const [passView, setPassView] = useState(true)
    useEffect(() => {
        dispatch(getUser());
    }, [])

    const [name, setName] = useState(props.userName)
    const [password, setPass] = useState('')
    const dispatch = useDispatch()

    function logout(){
        props.clickOutsideSettings();
        dispatch(logoutActionCreator());
    }

    let domNode = useClickOutside(() => {
        props.clickOutsideSettings();
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
                            value={`${name}`}
                        />
                    </div>
                    <button className={U.userButton}> Изменить имя </button>
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
                <button onClick={e => logout()}>Выйти из аккаунта</button>
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
})

export default connect(mapStateToProps)(UserSettings);
