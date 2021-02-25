import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import useClickOutside from "../Header/HeaderUtils/utils";
import {connect, useDispatch} from "react-redux";
import CH from '../Chats/Chats.module.css'
import {getUsers} from "../../redux/reducers/adminReducer";

function Users(props) {

    const dispatch = useDispatch()

    const [users, setUsers] = useState(props.users)

    const [userOpen, setUserOpen] = useState('')


    const deleteUser = (id) => {
        console.log(id)
        setUsers(chats => chats.filter(chat => chat.id !== id))
    }

    const openUser = (id) => {
        setUserOpen(id)
    }

    const closeUser = () => {
        setUserOpen('')
    }

    useEffect( () => {
        dispatch(getUsers())
    }, [])



    useEffect( () => {
        setUsers(props.users)
    }, [props.users])

    let domNode = useClickOutside(() => {
        props.closeUsers();
    });

    return ReactDOM.createPortal(
        <div className={props.usersActive ? CH.darkBackground : CH.darkBackgroundHidden}
        >
            <div className={CH.creatorContainer} ref={domNode}>
                {!userOpen && <div className={CH.chatGrid}>
                    <div className={CH.chatsHeader}>
                        <h1>Пользователи для {props.userRole}</h1>
                    </div>
                    <div className={CH.chats}>
                        {users.map(user => <UserElement name={user.user_name} mail={user.user_email}
                                                        deleteUser={deleteUser} openUser={openUser}/>)}
                    </div>
                </div>}
                {/*{chatOpen && <User closeUser={closeUser} chatId={chatOpen}/>}*/}
            </div>


        </div>,
        document.getElementById("portal")
    )
}

const UserElement = (props) => {
    const handleDeleteClick = (event) => {
        props.deleteUser(props.id)
        event.stopPropagation()
    }

    const handleOpenUser = () => {
        props.openUser(props.id)
    }

    return (
        <div className={CH.chatElement} onClick={handleOpenUser}>
            <div>

                <h3>{props.name}</h3>
                <h3>{props.mail}</h3>
            </div>
            <button className={CH.closeButton} onClick={handleDeleteClick}>Delete</button>
        </div>)
}


const mapStateToProps = (state) => ({
    currentId: state.user.userId,
    userRole: state.user.userRole,
    users: state.admin.users,
})

export default connect(mapStateToProps)(Users);