import React, {useEffect, useState} from "react";
import Card from "../Card/Card";
import F from "./Feed.module.css";
import {cardColors} from "../../commons/colors";
import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchThreads} from "../../redux/reducers/threadReducer";

const Feed = (props) => {
    const dispatch = useDispatch()
    const threads = props.threads;

    useEffect(() => {
        dispatch(fetchThreads())
    }, [])

    return (
        <div className={F.feed}>
            {threads.map((card, i) => {
                const cardProps = {
                    color: cardColors[Math.floor(Math.random() * cardColors.length)],
                    topicTitle: card.thread_title,
                    authorId: card.author_id,
                    createdAt: card.created_at,
                }
                return <Card key={`card${i}`} {...cardProps} />
            })}
        </div>
    );
}

const mapStateToProps = (state) => ({
    threads: state.threadData.threads,
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Feed);
