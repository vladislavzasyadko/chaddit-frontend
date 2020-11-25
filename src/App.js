import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import UserSettings from './components/Header/HeaderUtils/UserSettings/UserSettings';

function App() {
  return (
    <div>
      <UserSettings active={true}/>
      <Header />
      <Feed />
    </div>
  );
}

export default App;
