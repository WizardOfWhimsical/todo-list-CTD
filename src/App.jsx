import { Routes, Route } from 'react-router';
import TodosPage from './features/Todos/TodosPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import Header from './shared/Header';
// import Logon from './features/Logon';

// import { useAuth } from './context/AuthContext';

import './App.css';

function App() {
  // const { isAuthenticated } = useAuth();
  const TODOSPAGE = (
    <>
      <Header message={'Going To Do...'} />
      <TodosPage />
    </>
  );
  const LOGINPAGE = (
    <>
      <Header message={'Please Log In'} />
      <LoginPage />
    </>
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={LOGINPAGE} />
        <Route path="/todos" element={TODOSPAGE} />
        {/* <Route path="/about" element={} />
        <Route path="/profile" element={} />
        <Route path="*" element={} /> */}
      </Routes>
    </>
  );
}

export default App;
