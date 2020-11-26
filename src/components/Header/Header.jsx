import React from "react";
import H from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search/Search";

function Header(props) {
    return (
        <div className={H.header}>
            <div className={H.utils}>
                <div onClick={props.clickSettings}>User Icon</div>
                <div>Chats Icon</div>
                <div>Add Topic</div>
            </div>
            <div className={H.logo}>
                <Logo />
            </div>
            <div className={H.search}>
                <Search />
            </div>
        </div>
    );
}

export default Header;
