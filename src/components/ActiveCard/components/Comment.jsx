import React, {useEffect, useState} from "react";
import C from "../ActiveCard.module.css"

function Comment(props) {
    const {body, userId, postId, handleClick} = props

    const [responsesStatus, changeResponsesStatus] = useState(props.responsesStatus)
    const [responses, updateResponses] = useState(props.responses)

    const toggleResponses = () => {
        changeResponsesStatus(!responsesStatus);
    }
    useEffect(() => {
        updateResponses(props.responses);
        // changeResponsesStatus(true)
    }, [props.responses])

    return <div key={`comment_${postId}`}
                onClick={e => handleClick(e, postId, body)}
    >
        <div className={responsesStatus ? C.activeCard_activeComment : C.activeCard_comment}>
            {body}
            {responses.length > 0 && <button className={C.responseButton}
                     onClick={toggleResponses}>{`${responsesStatus ? 'Спрятать' : 'Показать'} Ответы`}
            </button>}
        </div>
        {responsesStatus && responses && responses.map(post => <Comment
            body={post.body}
            responsesStatus={false}
            responses={post.responses}
            userId={post.author_id}
            postId={post.post_id}
            handleClick={handleClick}/>)}
    </div>
}

export default Comment;