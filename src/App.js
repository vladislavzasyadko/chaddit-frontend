import React from "react";
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import Login from './components/Login/Login'
import {BrowserRouter, Route} from "react-router-dom";
import A from './App.css'

function App() {
    return (
        <BrowserRouter>
            <div className={A.app}>
                <Header/>
                <Route render={() => <Feed/>}
                       path={'/feed'}/>
                <Login/>
            </div>
        </BrowserRouter>
    );
}

export default App;
