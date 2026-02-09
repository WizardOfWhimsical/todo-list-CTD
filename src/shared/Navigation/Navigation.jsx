import { NavLink } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.siteTitle}>
        Lewis Labs
      </NavLink>
      <ul className={styles.linkContainer}>
        {!isAuthenticated ? (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        ) : null}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/todos">To-Dos List</NavLink>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
