import React, {useState} from "react";
import S from "./Search.module.css";
import Icon from "../../../icons/search.png";

function Search(props) {

    const [searchWord, setSearchWord] = useState('')
    const handleSubmit = event => {
        event.preventDefault()

    }
    return (
        <div className={S.searchContainer}>
            <form onSubmit={handleSubmit}>
                <input
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                    className={S.searchInput}
                    type="text"
                    placeholder="Что я могу для Вас найти?"
                />

                <button type="submit" class={S.searchButton}>
                    <img className={S.searchIcon} src={Icon}></img>
                </button>
            </form>
        </div>
    );
}

export default Search;
