import React, {useEffect, useState} from "react";
import C from "../ActiveCard.module.css"

function Comment(props) {
    const {body, postId, handleClick, userName} = props

    const [responsesStatus, changeResponsesStatus] = useState(props.responsesStatus)
    const [responses, updateResponses] = useState(props.responses)

    const toggleResponses = () => {
        changeResponsesStatus(!responsesStatus);
    }
    useEffect(() => {
        updateResponses(props.responses);
    }, [props.responses])

    return <div onClick={e => handleClick(e, postId, body)}
    >
        <div className={responsesStatus ? C.activeCard_activeComment : C.activeCard_comment}>
            <div className={C.commentText}>
                <div className={C.commentUserName}>{userName}</div>
                <div>{body}</div>
            </div>
            {responses.length > 0 && <button className={C.responseButton}
                     onClick={toggleResponses}>{`${responsesStatus ? 'Спрятать' : 'Показать'} Ответы`}
            </button>}
        </div>
        {responsesStatus && responses && responses.map(post => <Comment
            key={`comment_${post.post_id}`}
            body={post.body}
            responsesStatus={false}
            responses={post.responses}
            userId={post.author_id}
            userName={`${post.author.user_name}#${post.author.user_tag}`}
            postId={post.post_id}
            handleClick={handleClick}/>)}
    </div>
}

export default Comment;