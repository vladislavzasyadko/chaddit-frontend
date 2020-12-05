import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = props => {
    console.log(props)
    const {isAuth} = props;
    return !isAuth
        ? <Redirect to="/login"/>
        : <Route {...props} />
};

const mapStateToProps = state => ({
    isAuth: state.auth.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);