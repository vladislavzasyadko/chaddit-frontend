import React, {useState} from "react";
import S from "./Search.module.css";
import Icon from "../../../icons/search.png";
import {fetchThreads, searchThreads} from "../../../redux/reducers/threadReducer";
import {useDispatch} from "react-redux";

function Search(props) {
    const dispatch = useDispatch()

    const [searchWord, setSearchWord] = useState('')
    const handleSubmit = event => {
        event.preventDefault()
        if(searchWord){
            dispatch(searchThreads(searchWord))
        } else {
            dispatch(fetchThreads())
        }

    }
    return (
        <form className={S.searchContainer} onSubmit={e => handleSubmit(e)}>
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
        // </div>
    );
}

export default Search;
