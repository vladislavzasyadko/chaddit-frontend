import React, {useEffect, useState} from "react";
import H from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search/Search";
import UserSettings from "./HeaderUtils/UserSettings/UserSettings";
import {connect} from "react-redux";
import CreateThreadWidget from "./HeaderUtils/CreateThreadWidget/CreateThreadWidget";
import common from '../../commons/elements.module.css';
import User from '../../icons/user.svg';


function Header(props) {
    const [settingsActive, setSettingsStatus] = useState(false);
    const [creatorActive, setCreatorStatus] = useState(false);

    const openSettings = () => {
        setSettingsStatus(true);
    };

    const closeSettings = () => {
        setSettingsStatus(false);
    };

    const openCreator = () => {
        setCreatorStatus(true);
    };

    const closeCreator = () => {
        setCreatorStatus(false);
    };

    return (
        <div className={props.isAuth ? H.header : H.headerGuest}>
            {props.isAuth && <div className={H.utils}>
                <div className={H.userImage} onClick={props.isAuth ? openSettings : null}/>
                <div>{`Здравствуйте, ${props.isAuth ? props.userName : ' гость'}`}</div>
                <div>Чаты</div>
                <div className={H.userTopicCreator} onClick={props.isAuth ? openCreator : null}>
                    <button className={common.buttonChad}> Добавить тред </button>

                </div>
            </div>}
            <div className={H.logo}>
                <Logo />
            </div>
            {props.isAuth && <div className={H.search}>
                <Search/>
            </div>}
            {props.isAuth && <UserSettings
                closeSettings={closeSettings}
                settingsActive={settingsActive}
            />}
            {props.isAuth && <CreateThreadWidget
                creatorActive={creatorActive}
                closeCreator={closeCreator}/>}
        </div>
    );
}

const mapStateToProps = state => ({
    userName: state.user.userName,
    isAuth: state.auth.loggedIn,
})


export default connect(mapStateToProps)(Header);
