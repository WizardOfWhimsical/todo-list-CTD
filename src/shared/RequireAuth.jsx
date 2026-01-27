import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // forced it to work but i get some kind of throttle warning in the console. i dont like it
  // from is profile!! wtf did i have to hard code it then??
  const from = location.state?.from?.pathname || '/profile';
  console.log('consoleLog from inside requireAuth\n', from);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(from, { replace: true });
    }
  });
  return children;
}
