import React, { useState } from "react";
import H from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search/Search";
import UserSettings from "./HeaderUtils/UserSettings/UserSettings";

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
                <div className={H.userImage} onClick={clickSettings}></div>
                <div>Здравствуйте, Данила</div>
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

export default Header;
