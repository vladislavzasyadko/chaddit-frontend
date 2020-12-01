import React from "react";
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import A from './App.css'

function App() {
  return (
    <div className={A.app}>
      <Header />
      <Feed />
    </div>
  );
}

export default App;
