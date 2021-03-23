import React, {useState} from "react";
import C from "../../Card/Card.module.css";
import sT from "./Topic.module.css";
import {Redirect} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {clearThreads} from "../../../redux/reducers/threadReducer";
import AdminTopic from "./AdminTopic";

function Topic(props) {
    const dispatch = useDispatch()
    const [chosenTopic, setChosenTopic] = useState(false)
    const [adminOpen, setAdminOpen] = useState(false)
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
        props.getTopics(tag)
        e.stopPropagation()
    }

    const closeAdminTopic = () => {
        setAdminOpen(false);
    }

    const handleChangeTopic = (e) => {
        setAdminOpen(true)
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

                    <div className={sT.adminTopicDelete}>
                        <h2 className={C.cardTitle}>{topicTitle}</h2>
                        {(props.userRole === 'ADMIN' || props.userRole === 'MOD') &&
                        <button className={sT.deleteTopicButton}
                                 onClick={e => handleChangeTopic(e)}>{'Изменить'}</button>}
                    </div>
                    <div className={sT.tagList}>{tags.length > 0 && 'Теги:'}{tags.map(tag =>
                        <div className={isColorLight ? sT.tagLight : sT.tag}
                             onClick={(e) => handleTagClick(e, tag.tag)}>
                            {tag.tag}</div>)}
                    </div>
                </div>
                {adminOpen && <AdminTopic topicId={topicId} name={topicTitle} tags={tags} closeTopic={closeAdminTopic} active={adminOpen}/>}
            </>}
        </>
    )
        ;
}

const mapStateToProps = (state) => ({
    currentId: state.user.userId,
    chats: state.chats.chats,
    userRole: state.user.userRole,
})


export default connect(mapStateToProps)(Topic);
