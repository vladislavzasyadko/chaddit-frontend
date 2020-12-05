import React, { useState } from "react";
import H from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search/Search";
import UserSettings from "./HeaderUtils/UserSettings/UserSettings";
import {connect} from "react-redux";

function Header(props) {
    const [settingsActive, setSettingsStatus] = useState(false);

    const clickSettings = () => {
        setSettingsStatus(true);
    };


    const clickOutsideSettings = () => {
        setSettingsStatus(false);
    };
    return (
        <div className={H.header}>
            <div className={H.utils}>
                <div className={H.userImage} onClick={clickSettings}/>
                <div>Здравствуйте, {props.userName}</div>
                <div>Chats Icon</div>
                <div>Add Topic</div>
            </div>
            <div className={H.logo}>
                <Logo />
            </div>
            <div className={H.search}>
                <Search />
            </div>
            <UserSettings
                clickOutsideSettings={clickOutsideSettings}
                settingsActive={settingsActive}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    userName: state.user.userName,
})


export default connect(mapStateToProps)(Header);
