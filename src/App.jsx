import { Routes, Route } from 'react-router';
import TodosPage from './features/Todos/TodosPage';
import Header from './shared/Header';
import Logon from './features/Logon';

import { useAuth } from './context/AuthContext';

import './App.css';

function App() {
  const { isAuthenticated } = useAuth();
  const TODOSPAGE = (
    <>
      <Header message={'Going To Do...'} />
      <TodosPage />
    </>
  );
  const LOGONPAGE = (
    <>
      <Header message={'Please Log In'} />
      <Logon />
    </>
  );
  // i want to nest this or give them there own page. loggin in isnt the same as home page
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? TODOSPAGE : LOGONPAGE} />
        {/* <Route path="/about" element={} />
        <Route path="/login" element={} />
        <Route path="/todos" element={} />
        <Route path="/profile" element={} />
        <Route path="*" element={} /> */}
      </Routes>
    </>
  );
}

export default App;
