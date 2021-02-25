import React, {useState} from "react";
import S from "./Search.module.css";
import Icon from "../../../icons/search.png";
import {fetchThreads, searchThreads} from "../../../redux/reducers/threadReducer";
import {connect, useDispatch} from "react-redux";
import {TOPICS} from "../../../redux/reducers/types";
import {fetchTopics, searchTopics} from "../../../redux/reducers/topicReducer";

function Search(props) {
    const dispatch = useDispatch()

    const [searchWord, setSearchWord] = useState('')
    const handleSubmit = event => {
        event.preventDefault()
        if(searchWord){
            if(props.field === TOPICS){
                console.log(searchWord)
                dispatch(searchTopics(searchWord))
            }else {
                dispatch(searchThreads(searchWord))
            }
        } else {
            dispatch(fetchThreads())
            if(props.field === TOPICS){
                dispatch(fetchTopics())
            }else {
                dispatch(fetchThreads(props.topicId))
            }
        }

    }
    return (
        <form className={S.searchContainer} onSubmit={e => handleSubmit(e)}>
            <input
                value={searchWord}
                onChange={e => setSearchWord(e.target.value)}
                className={S.searchInput}
                type="text"
                placeholder={`Что я могу для Вас найти? ${props.field}`}
            />

            <button type="submit" class={S.searchButton}>
                <img className={S.searchIcon} src={Icon}></img>
            </button>
        </form>
        // </div>
    );
}

const mapStateToProps = (state) => ({
    field: state.search.field,
    topicId: state.search.topicId,
})

export default connect(mapStateToProps)(Search);
