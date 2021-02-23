import React, {useEffect} from "react";
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import Login from './components/Login/Login'
import {BrowserRouter, Route, Redirect } from "react-router-dom";
import A from './App.css'
import PrivateRoute from "./hoc/PrivateRoute";
import Topics from "./components/Topics/Topics";
import {checkToken} from "./redux/reducers/authReducer";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('checking token')
        dispatch(checkToken())
    },[])

    return (
        <BrowserRouter>
            <div className={A.app}>
                <Header/>
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/topics" />}
                />
                <PrivateRoute exact path={'/topics/:id'} component={Feed}/>
                <PrivateRoute exact path={'/topics'} component={Topics}/>
                <Route component={Login}
                       exact path={'/login'}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
