import React, {useState} from "react";
import C from "../../Card/Card.module.css";
import sT from "./Topic.module.css";
import {formatDate} from "../../../utils/formatters";
import {Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearThreads} from "../../../redux/reducers/threadReducer";

function Topic(props) {
    const dispatch = useDispatch()
    const [chosenTopic, setChosenTopic] = useState(false)
    const {
        topicTitle,
        topicId,
        createdAt,
        color,
        isColorLight,
        authorName,
        image,
        tags,
    } = props;

    const handleClick = () => {
        dispatch(clearThreads())
        setChosenTopic(true)
    }

    const handleTagClick = (e, tag) => {
        console.log('click', tag)
        props.getTopics(tag)
        e.stopPropagation()
    }

    return (
        <>
            {chosenTopic && <Redirect to={`/topics/${topicId}`}/>}
            {!chosenTopic && <>
                <div
                    style={{
                        'min-height': "100px",
                        'min-width': '250px',
                        width: "23%",
                        backgroundColor: color,
                        color: isColorLight ? 'black' : '#d0d0d0',
                    }}
                    className={C.card}
                    onClick={handleClick}
                >
                    <h2 className={C.cardTitle}>{topicTitle}</h2>
                    <div className={sT.tagList}>{tags.length > 0 && 'Теги:'}{tags.map(tag =>
                        <div className={isColorLight ? sT.tagLight : sT.tag}
                             onClick={(e) => handleTagClick(e, tag.tag)}>
                            {tag.tag}</div>)}
                    </div>
                    <div className={C.cardFooter}>
                        <div>Автор: {authorName}</div>
                        <div className={C.cardDate}>{formatDate(createdAt)}</div>
                    </div>
                </div>
            </>}
        </>
    )
        ;
}


export default Topic;
