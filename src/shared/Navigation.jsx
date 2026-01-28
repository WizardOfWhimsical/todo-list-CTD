import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  // const { isAuthenticated } = useAuth();
  return (
    <nav className="nav">
      <NavLink to="/" className="site-title">
        Lewis Labs
      </NavLink>
      <ul className="link-container">
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/todos">To-Dos List</NavLink>
        </li>
      </ul>
    </nav>
  );
}
