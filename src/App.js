import React, { useState } from "react";
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import UserSettings from './components/Header/HeaderUtils/UserSettings/UserSettings';

function App() {
  const [settingsActive, setSettingsStatus] = useState(false)

  const clickSettings = () => {
    setSettingsStatus(true)
  }

  const clickOutsideSettings = () => {
    setSettingsStatus(false)
  }

  return (
    <div style={{overflow:'hidden'}}>
      {settingsActive && <UserSettings clickOutsideSettings={clickOutsideSettings}/>}
      <Header clickSettings={clickSettings}/>
      <Feed />
    </div>
  );
}

export default App;
