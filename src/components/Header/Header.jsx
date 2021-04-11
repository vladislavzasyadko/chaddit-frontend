import React, {useEffect, useState} from "react";
import H from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search/Search";
import UserSettings from "./HeaderUtils/UserSettings/UserSettings";
import {connect, useDispatch} from "react-redux";
import CreateThreadWidget from "./HeaderUtils/CreateThreadWidget/CreateThreadWidget";
import common from '../../commons/elements.module.css';
import {getUser} from "../../redux/reducers/userReducer";
import userImage from '../../icons/chadnobg.png'
import Chats from "../Chats/Chats";
import Users from "../Users/Users";


function Header(props) {
    const dispatch = useDispatch()

    const [settingsActive, setSettingsStatus] = useState(false);
    const [creatorActive, setCreatorStatus] = useState(false);
    const [chatsActive, setChatsActive] = useState(false);
    const [usersActive, setUsersActive] = useState(false);

    useEffect(
        () => {
            dispatch(getUser());
        },
        [props.isAuth],
    );

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

    const openChats = () => {
        setChatsActive(true)
    }

    const closeChats = () => {
        setChatsActive(false)
    }

    const openUsers = () => {
        setUsersActive(true)
    }

    const closeUsers = () => {
        setUsersActive(false)
    }

    return (
        <div className={props.isAuth ? H.header : H.headerGuest}>
            {props.isAuth && <div className={H.utils}>
                <div id={'userImage'} className={H.userImage} style={{
                    backgroundImage: `url(${userImage})`,
                    backgroundSize: "cover",
                }} onClick={props.isAuth ? openSettings : null}/>
                <div className={H.buttons}>
                <div id={'openCreateThreadWidgetButton'} className={H.userTopicCreator} onClick={props.isAuth ? openCreator : null}>
                    <button className={common.buttonChad}>{'Добавить тред'}</button>

                </div>

                <div id={'openUserChatsButton'} className={H.userTopicCreator} onClick={props.isAuth ? openChats : null}>
                    <button className={common.buttonChad}>{'Чаты'}</button>

                </div>

                    {props.userRole === 'ADMIN' &&
                    <div id={'openAdminUsersButton'} className={H.userTopicCreator} onClick={props.isAuth ? openUsers : null}>
                        <button className={common.buttonChad}>{'USERS'}</button>

                    </div>}
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
            {props.isAuth && <Chats chatsActive={chatsActive} closeChats={closeChats}/>}
            {props.isAuth && <Users usersActive={usersActive} closeUsers={closeUsers}/>}
        </div>
    );
}

const mapStateToProps = state => ({
    userName: state.user.userName,
    isAuth: state.auth.loggedIn,
    userRole: state.user.userRole,
})


export default connect(mapStateToProps)(Header);
