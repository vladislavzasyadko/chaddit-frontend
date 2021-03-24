import React, {useEffect, useState} from "react";

import Card from "../Card/Card";
import F from "./Feed.module.css";
import {cardColorsNum} from "../../commons/colors";
import {connect, useDispatch} from 'react-redux';
import {fetchThreads} from "../../redux/reducers/threadReducer";
import ActiveCard from "../ActiveCard/ActiveCard";
import {colorIsLight} from "../../utils/formatters";
import {setSearchField, setSearchTopicId} from "../../redux/reducers/searchReducer";
import {THREADS} from "../../redux/reducers/types";

const Feed = (props) => {
    console.log('feed props', props)
    const dispatch = useDispatch()
    const [threads, updateThreads] = useState(props.threads);

    useEffect(() => {
        dispatch(setSearchField(THREADS))
        dispatch(setSearchTopicId(props.match.params.id))
        dispatch(fetchThreads(props.match.params.id))
    }, [])

    useEffect(()=> {
        updateThreads(props.threads)
    },[props.threads])

    const [activeCard, setCardStatus] = useState('');

    const openCard = (id) => {
        setCardStatus(id);
    };

    const closeCard = () => {
        setCardStatus('');
    };

    return (
        <div className={F.feed}>
            {threads.length === 0 && <h2 className={F.notFound}>Ничего не найдено :( </h2>}
            {threads.filter(card => card.topic_id === parseInt(props.match.params.id)).map((card, i) => {
                const color = cardColorsNum[(parseInt(card.thread_id )% (cardColorsNum.length - 1))]
                const cardProps = {
                    color: `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`,
                    isColorLight: colorIsLight(...color),
                    threadId: card.thread_id,
                    threadTitle: card.thread_title,
                    authorId: card.author_id,
                    createdAt: card.created_at,
                    preview: card.posts[0].body,
                    cardId: i.toString(),
                    openCard: openCard,
                    closeCard: closeCard,
                    image: card.image,
                    views: card.views,
                    authorName: `${card.author.user_name}#${card.author.user_tag}`
                }
                return <Card key={`card${i}`} {...cardProps} />
            })}
            {activeCard &&
            <ActiveCard cardId={activeCard} closeActiveCard={closeCard} info={threads[parseInt(activeCard)]}/>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    threads: state.threadData.threads,
    topics: state.topics.topics,
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Feed);
