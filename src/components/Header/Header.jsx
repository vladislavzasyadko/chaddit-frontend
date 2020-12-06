import React, {useEffect, useState} from "react";
import H from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search/Search";
import UserSettings from "./HeaderUtils/UserSettings/UserSettings";
import {connect} from "react-redux";

function Header(props) {
    const [settingsActive, setSettingsStatus] = useState(false);

    const openSettings = () => {
        setSettingsStatus(true);
    };

    const closeSettings = () => {
        setSettingsStatus(false);
    };

    return (
        <div className={H.header}>
            <div className={H.utils}>
                <div className={H.userImage} onClick={props.isAuth ? openSettings : null}/>
                <div>{`Здравствуйте, ${props.isAuth ? props.userName : 'гость'}`}</div>
                <div>Chats Icon</div>
                <div>Add Topic</div>
            </div>
            <div className={H.logo}>
                <Logo />
            </div>
            <div className={H.search}>
                <Search />
            </div>
            {props.isAuth && <UserSettings
                closeSettings={closeSettings}
                settingsActive={settingsActive}
            />}
        </div>
    );
}

const mapStateToProps = state => ({
    userName: state.user.userName,
    isAuth: state.auth.loggedIn,
})


export default connect(mapStateToProps)(Header);
