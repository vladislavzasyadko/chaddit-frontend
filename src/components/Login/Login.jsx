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
        return <Redirect to={'/feed'}/>
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
                        Login
                    </div>
                    <div className={type === 'Register' ? L.activeOption : L.typeOption} onClick={e => changeType('Register')}>
                        Register
                    </div>
                </div>
                {type === 'Login' && <div className={L.loginForm}>
                    <input className={L.inputField} type={'text'} placeholder={'Input email'}
                           onChange={e => setEmail(e.target.value)}/>
                    <input className={L.inputField} type={'password'} placeholder={'Input password'}
                           onChange={e => setPassword(e.target.value)}/>
                    <button className={L.buttonForm} type={'submit'} onClick={login}>Login</button>
                </div>}

                {type === 'Register' && <div className={L.loginForm}>
                    <input className={L.inputField} type={'text'} placeholder={'Input name'}
                           onChange={e => setName(e.target.value)}/>
                    <input className={L.inputField} type={'email'} placeholder={'Input email'}
                           onChange={e => setEmail(e.target.value)}/>
                    <input className={L.inputField} type={'password'} placeholder={'Input password'}
                           onChange={e => setApprPassword(e.target.value)}/>
                    <input className={L.inputField} type={'password'} placeholder={'Repeat password'}
                           onChange={e => setPassword(e.target.value)}/>
                    <button className={L.buttonForm} type={'submit'} onClick={register}>Register</button>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.loggedIn,
})

export default connect(mapStateToProps)(Login);