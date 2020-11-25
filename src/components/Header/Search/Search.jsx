import React from "react";
import S from "./Search.module.css";
import Icon from "../../../icons/search.png";

function Search(props) {
    return (
        <div className={S.searchContainer}>
            <input
                className={S.searchInput}
                type="text"
                placeholder="What can I help you with today?"
            />

            <button type="submit" class={S.searchButton}>
                <img className={S.searchIcon} src={Icon}></img>
            </button>
        </div>
    );
}

export default Search;
