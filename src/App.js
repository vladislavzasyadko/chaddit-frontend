import React from "react";
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import Login from './components/Login/Login'
import {BrowserRouter, Route, Redirect } from "react-router-dom";
import A from './App.css'
import PrivateRoute from "./hoc/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <div className={A.app}>
                <Header/>
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/feed" />}
                />
                <PrivateRoute path={'/feed'} component={Feed}/>
                <Route component={Login}
                       path={'/login'}/>


            </div>
        </BrowserRouter>
    );
}

export default App;
