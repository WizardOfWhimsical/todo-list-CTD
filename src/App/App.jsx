import { Routes, Route } from 'react-router';
import TodosPage from '../pages/TodosPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import AboutPage from '../pages/AboutPage';
import ProfilePage from '../pages/ProfilePage';
import ErrorPage from '../pages/ErrorPage';

import Navigation from '../shared/Navigation';

import RequireAuth from '../shared/RequireAuth';

import styles from './App.module.css';

function App() {
  return (
    <>
      <Navigation />
      <div className={styles.routesContainer}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/todos"
            element={<RequireAuth>{<TodosPage />}</RequireAuth>}
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
