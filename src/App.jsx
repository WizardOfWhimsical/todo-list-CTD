//App.jsx
import './App.css';
import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import Logon from './features/Logon';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Header />
      <TodosPage />
      <Logon />
    </>
  );
}

export default App;
