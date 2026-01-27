import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  return;
}
