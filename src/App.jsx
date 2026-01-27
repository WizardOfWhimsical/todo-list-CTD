import { Routes, Route } from 'react-router';
import TodosPage from './pages/TodosPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

import Header from './shared/Header';
import RequireAuth from './shared/RequireAuth';
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
        <Route path="/todos" element={<RequireAuth>{TODOSPAGE}</RequireAuth>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="*" element={} /> */}
      </Routes>
    </>
  );
}

export default App;
