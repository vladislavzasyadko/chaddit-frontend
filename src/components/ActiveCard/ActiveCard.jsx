import React, {useEffect, useState} from "react";
import C from "./ActiveCard.module.css";
import cat from "../../icons/cat.png";
import {formatDate, formatReplyString} from "../../utils/formatters";
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
    const [responses, setResponses] = useState([])

    let domNode = useClickOutside(() => {
        dispatch(clearThread());
        dispatch(clearPosts());
        props.closeActiveCard();
    });

    function handleClick(event, postId, body){
        if(event && event.stopPropagation){
            event.stopPropagation()
            console.log(postId)
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
            console.log('updated')
            setActivePosts([...props.posts])
        }

    }, [props.posts])



    const chooseCommentId = id => {
        console.log('set reply id to', id)
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
        }

        dispatch(sendPost(newPost, replyId));
    }

    // const search = (tree, target) => {
    //     if (tree.post_id === target) {
    //         return tree;
    //     }
    //
    //     for (const response of tree.responses) {
    //         const res = search(response, target);
    //
    //         if (res) {
    //             return res;
    //         }
    //     }
    // };


    return ReactDOM.createPortal(
        <div className={props.cardId ? C.darkBackground : C.darkBackgroundHidden}
        >
            <div className={C.creatorContainer} ref={domNode}>
                {thread && <div className={C.creatorGrid}>
                    <div className={C.activeCard_header}>
                        <div className={C.userImage}></div>
                        <div className={C.activeCard_title}>
                            <h2>{thread.thread_title}</h2>
                            <div className={C.activeCard_time}>{formatDate(thread.created_at)}</div>
                        </div>
                    </div>
                    <div className={C.commentSection}>
                        {posts.map((post) =>
                            <Comment
                                responses={post.responses}
                                body={post.body}
                                userId={post.author_id}
                                postId={post.post_id}
                                responsesStatus={true}
                                handleClick={handleClick}/>)}

                    </div>
                    <form className={C.activeCardForm} onSubmit={handleSubmit}>
                        {`Replying to: ${formatReplyString(replyComment, 15)}`}
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
})

export default connect(mapStateToProps)(ActiveCard);