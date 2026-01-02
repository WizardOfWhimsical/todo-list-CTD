//App.jsx
import './App.css';
import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import Logon from './features/Logon';
import { useState } from 'react';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return token ? (
    <>
      <Header message={'Hopefully Do'} />
      <TodosPage token={token} />
    </>
  ) : (
    <>
      <Header message={'Please Log In'} />
      <Logon onSetEmail={setEmail} onSetToken={setToken} />
    </>
  );
}

export default App;
