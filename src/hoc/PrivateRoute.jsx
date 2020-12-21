import React from "react";
import {connect, useDispatch} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {getUser} from "../redux/reducers/userReducer";

const PrivateRoute = props => {
    const dispatch = useDispatch()
    const {isAuth} = props;
    if(isAuth){
        dispatch(getUser())
    }

    return !isAuth
        ? <Redirect to="/login"/>
        : <Route {...props} />
};

const mapStateToProps = state => ({
    isAuth: state.auth.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);