import React, {useEffect, useState} from "react";
import Card from "../Card/Card";
import F from "./Feed.module.css";
import {cardColors} from "../../commons/colors";
import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchTopicsThunkCreator} from "../../redux/reducers/topicsReducer";

const Feed = (props) => {
    const dispatch = useDispatch()
    const topics = props.topics;

    useEffect(() => {
        dispatch(fetchTopicsThunkCreator())
    }, [])

    return (
        <div className={F.feed}>
            {topics.map((card, i) => {
                const cardProps = {
                    color: cardColors[Math.floor(Math.random() * cardColors.length)],
                    topicTitle: card.topic_title,
                    authorId: card.author_id,
                    createdAt: card.created_at,
                }
                return <Card key={`card${i}`} {...cardProps} />
            })}
        </div>
    );
}

const mapStateToProps = (state) => ({
    topics: state.topicsData.topics,
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Feed);
