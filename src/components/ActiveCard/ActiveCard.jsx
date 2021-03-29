import React, {useEffect, useState} from "react";
import C from "./ActiveCard.module.css";
import {formatDate} from "../../utils/formatters";
import ReactDOM from "react-dom";
import useClickOutside from "../Header/HeaderUtils/utils";
import {clearThread, fetchThread} from "../../redux/reducers/threadReducer";
import {connect, useDispatch} from "react-redux";
import Comment from "./components/Comment";
import {clearPosts, sendPost, setPosts} from "../../redux/reducers/postsReducer";

function ActiveCard(props) {
    const dispatch = useDispatch()
    const thread = props.thread
    const currentUserId = props.currentId

    const [replyId, setReplyId] = useState('')
    const [replyComment, setCurrentReplyComment] = useState('')
    const [replyText, setReplyText] = useState('')
    const [posts, setActivePosts] = useState(props.posts)
    const [, setResponses] = useState([])

    let domNode = useClickOutside(() => {
        dispatch(clearThread());
        dispatch(clearPosts());
        props.closeActiveCard();
    });

    function handleClick(event, postId, body){
        if(event && event.stopPropagation){
            event.stopPropagation()
            chooseCommentId(postId)
            setCurrentReplyComment(body)
        }
    }


    useEffect(() => {
        dispatch(fetchThread(props.cardId))
    }, [])

    useEffect( () => {
        if(thread){
            setReplyId(thread.posts[0].post_id)
            setCurrentReplyComment(thread.posts[0].body)
            dispatch(setPosts(thread.posts))
            setResponses(thread.posts[0].responses)
        }
    },[props.thread])

    useEffect(() => {
        if(posts){
            setActivePosts([...props.posts])
        }

    }, [props.posts])



    const chooseCommentId = id => {
        setReplyId(id)
    }

    const handleSubmit = event => {
        sendNewPost();
        setReplyText('');
        event.preventDefault();
    }

    const sendNewPost = () => {
        const newPost = {
            body: replyText,
            userId: currentUserId,
            threadId: thread.thread_id,
            rootPostId: replyId,
            userName: props.userName,
        }

        dispatch(sendPost(newPost, replyId));
    }

    return ReactDOM.createPortal(
        <div className={props.cardId ? C.darkBackground : C.darkBackgroundHidden}
        >
            <div className={C.creatorContainer} ref={domNode}>
                {thread && <div className={C.creatorGrid}>
                    <div className={C.activeCard_header}>
                        <div className={C.activeCard_title}>
                            <h2>{thread.thread_title}</h2>
                            <div>{formatDate(thread.created_at)}</div>
                        </div>
                    </div>
                    <div className={C.commentSection}>
                        {posts.map((post) =>
                            <Comment
                                key={`comment_${post.post_id}`}
                                responses={post.responses}
                                body={post.body}
                                userId={post.author_id}
                                postId={post.post_id}
                                userName={`${post.author.user_name}#${post.author.user_tag}`}
                                responsesStatus={true}
                                handleClick={handleClick}/>)}

                    </div>
                    <form className={C.activeCardForm} onSubmit={handleSubmit}>
                        <div className={C.replyToPreview}>{`Replying to: ${replyComment}`}</div>
                        <textarea className={C.activeCard_createComment}
                                  placeholder={'Ваше сообщение...'}
                                  onChange={ e=> setReplyText(e.target.value)}
                                    value={replyText}/>
                        <button className={C.activeCard_button} type={"submit"}>{'Отправить'}</button>
                    </form>
                </div>}
            </div>

        </div>,
        document.getElementById("portal")
    )
}


const mapStateToProps = (state) => ({
    thread: state.threadData.thread,
    posts: state.posts.posts,
    currentId: state.user.userId,
    userName: `${state.user.userName}#${state.user.userTag}`
})

export default connect(mapStateToProps)(ActiveCard);