import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import AT from '../../Topics/Topic/Topic.module.css';
import {getUsers, updateUser} from "../../../redux/reducers/adminReducer";

function User(props) {

    const dispatch = useDispatch()

    const [userName, setUserName] = useState(props.name)
    const [userMail, setUserMail] = useState(props.mail)
    const [userPass, setUserPass] = useState('')

    useEffect(() => {
        setUserName(props.name);
        setUserMail(props.mail);
    }, [props])

    const saveUserData = () => {
        let user = {}
        if(userName){
            user.user_name = userName
        }
        if(userMail){
            user.user_email = userMail
        }
        if(userPass){
            user.user_pass = userPass
        }
        dispatch(updateUser(props.uid, user))
    }

    const handleCloseUser = () => {
        dispatch(getUsers())
        props.closeUser()
    }

    return (
        <div className={AT.adminUser}>
            <div className={AT.adminHeader}><h1>{'Информация пользователя'}</h1>
                <div>
                    <button className={AT.saveButton} onClick={saveUserData}>{'Сохранить'}</button>
                    <button className={AT.deleteTopicButton} onClick={handleCloseUser}>{'Назад'}</button>
                </div>
            </div>

            <label className={AT.userLabel}>{'Имя пользователя'}</label>
            <input className={AT.inputCreator} value={userName} onChange={e => setUserName(e.target.value)}/>
            <label className={AT.userLabel}>{'Email пользователя'}</label>
            <input className={AT.inputCreator} value={userMail} onChange={e => setUserMail(e.target.value)}/>
            <label className={AT.userLabel}>{'Пароль пользователя'}</label>
            <input className={AT.inputCreator} value={userPass} type={'password'} onChange={e => setUserPass(e.target.value)}/>
        </div>
    )
}


const mapStateToProps = (state) => ({
    currentId: state.user.userId,
})

export default connect(mapStateToProps)(User);