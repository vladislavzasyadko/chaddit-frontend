import React, {useEffect, useState} from "react";
import ReactPlayer from 'react-player';
import Card from "../Card/Card";
import F from "./Feed.module.css";
import {cardColorsNum} from "../../commons/colors";
import {connect, useDispatch} from 'react-redux';
import {fetchThreads} from "../../redux/reducers/threadReducer";
import ActiveCard from "../ActiveCard/ActiveCard";
import {colorIsLight} from "../../utils/formatters";

const Feed = (props) => {
    const dispatch = useDispatch()
    const [threads, updateThreads] = useState(props.threads);

    useEffect(() => {
        dispatch(fetchThreads())
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
            {/*<ReactPlayer*/}
            {/*    url="https://www.youtube.com/watch?v=YFJ3W54NEJo"*/}
            {/*    playing*/}
            {/*    autoplay*/}
            {/*/>*/}
            {threads.map((card, i) => {
                // console.log(card)
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
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Feed);
