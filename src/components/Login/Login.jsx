import React, {useState} from "react";
import L from "./Login.module.css";
import {connect, useDispatch} from "react-redux";
import {loginActionCreator, registerActionCreator} from "../../redux/reducers/authReducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [approvingPassword, setApprPassword] = useState("");
    const [name, setName] = useState("")
    const [type, setType] = useState('Login');

    const dispatch = useDispatch()

    if (props.isAuth) {
        return <Redirect to={'/topics'}/>
    }

    const changeType = type => {
        setType(type)
    }

    function login() {
        dispatch(loginActionCreator(email, password))
    }

    function register() {
        if (checkRegisterData()) {
            dispatch(registerActionCreator(name, email, password))
        }
    }

    function checkRegisterData() {
        return password === approvingPassword && name && email;
    }


    return (
        <div className={L.loginRegisterContainer}>
            <div className={L.loginForm}>
                <div className={L.chooseType}>
                    <div className={type === 'Login' ? L.activeOption : L.typeOption} onClick={e => changeType('Login')}>
                        {'Вход'}
                    </div>
                    <div className={type === 'Register' ? L.activeOption : L.typeOption} onClick={e => changeType('Register')}>
                        {'Регистрация'}
                    </div>
                </div>
                {type === 'Login' && <div className={L.loginForm}>
                    <input id={'loginEmail'} className={L.inputField} type={'text'} placeholder={'Введите адрес эл. почты'}
                           onChange={e => setEmail(e.target.value)}/>
                    <input id={'loginPass'} className={L.inputField} type={'password'} placeholder={'Введите пароль'}
                           onChange={e => setPassword(e.target.value)}/>
                    <button id={'loginButton'} className={L.buttonForm} type={'submit'} onClick={login}>{'Войти'}</button>
                </div>}

                {type === 'Register' && <div className={L.loginForm}>
                    <input id={'registerName'} className={L.inputField} type={'text'} placeholder={'Введите имя'}
                           onChange={e => setName(e.target.value)}/>
                    <input id={'registerEmail'} className={L.inputField} type={'email'} placeholder={'Введите адрес эл. почты'}
                           onChange={e => setEmail(e.target.value)}/>
                    <input id={'registerPass'} className={L.inputField} type={'password'} placeholder={'Введите пароль'}
                           onChange={e => setApprPassword(e.target.value)}/>
                    <input id={'registerCheckPass'} className={L.inputField} type={'password'} placeholder={'Повторите пароль'}
                           onChange={e => setPassword(e.target.value)}/>
                    <button id={'registerButton'} className={L.buttonForm} type={'submit'} onClick={register}>{'Регистрация'}</button>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Login);