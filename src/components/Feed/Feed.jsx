import React, {useEffect, useState} from "react";
import Card from "../Card/Card";
import F from "./Feed.module.css";
import {cardColors} from "../../commons/colors";
import {connect, useDispatch} from 'react-redux';
import {fetchThreads} from "../../redux/reducers/threadReducer";
import ActiveCard from "../ActiveCard/ActiveCard";

const Feed = (props) => {
    const dispatch = useDispatch()
    const threads = props.threads;

    useEffect(() => {
        dispatch(fetchThreads())
    }, [])

    const [activeCard, setCardStatus] = useState('');

    const openCard = (id) => {
        setCardStatus(id);
    };

    const closeCard = () => {
        setCardStatus('');
    };

    return (
        <div className={F.feed}>
            {threads.map((card, i) => {
                const cardProps = {
                    color: cardColors[Math.floor(Math.random() * cardColors.length)],
                    threadId: card.thread_id,
                    threadTitle: card.thread_title,
                    authorId: card.author_id,
                    createdAt: card.created_at,
                    preview: card.posts[0].body,
                    cardId: i.toString(),
                    openCard: openCard,
                    closeCard: closeCard,
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
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Feed);
