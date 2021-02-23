import React, {useEffect, useState} from "react";

import T from "./Topics.module.css";
import {cardColorsNum} from "../../commons/colors";
import {connect, useDispatch} from 'react-redux';
import ActiveCard from "../ActiveCard/ActiveCard";
import {colorIsLight} from "../../utils/formatters";
import {fetchTopics, getTopic} from "../../redux/reducers/topicReducer";
import Topic from "../Topics/Topic/Topic";
import {setSearchField} from "../../redux/reducers/searchReducer";
import {TOPICS} from "../../redux/reducers/types";

const Topics = (props) => {
    const dispatch = useDispatch()
    const [topics, updateTopics] = useState(props.topics);
    const [tag, setTag] = useState('')

    useEffect(() => {
        dispatch(setSearchField(TOPICS))
        props.history.push('/topics')
        if(!tag) {
            dispatch(fetchTopics())
        }
    }, [])

    useEffect(() => {
        updateTopics(props.topics)
    }, [props.topics])

    const getTopicsByTag = (tag) => {
        setTag(tag);
    }

    useEffect( () => {
        if(tag) {
            dispatch(getTopic(tag))
        } else {
            dispatch(fetchTopics())
        }
    }, [tag])

    return (<>
            <div className={T.searchDiv}><h3 className={tag ? T.searchCondition : T.searchConditionHidden}>{'Темы по тегу: #' + tag}</h3>
                {tag && <button className={T.deleteTagButton} onClick={() => setTag('')}>{'Удалить'}</button>}</div>
        <div className={T.topics}>
            {topics.length === 0 && <h2 className={T.notFound}>Ничего не найдено :( </h2>}

            {topics.map((card, i) => {
                const color = cardColorsNum[(parseInt(card.topic_id )% (cardColorsNum.length - 1))]
                const cardProps = {
                    color: `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`,
                    isColorLight: colorIsLight(...color),
                    topicId: card.topic_id,
                    topicTitle: card.topic_title,
                    authorId: card.author_id,
                    createdAt: card.created_at,
                    tags: card.tags,
                    cardId: i.toString(),
                    image: card.image,
                    getTopics: getTopicsByTag,
                    authorName: `${card.author.user_name}#${card.author.user_tag}`
                }
                return <Topic key={`card${i}`} {...cardProps} />
            })}
        </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    topics: state.topics.topics,
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Topics);
