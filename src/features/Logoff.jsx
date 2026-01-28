import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';

export default function Logoff() {
  const [error, setError] = useState('');
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogoff() {
    setIsLoggingOff(true);
    setError('');
    try {
      const result = await logout();
      console.log('logging out component\n', result);
      if (result.success) {
        navigate('/login', { replace: true });
      } else {
        setError(result.error);
        setIsLoggingOff(false);
        const error = result.error;
        throw error;
      }
    } catch (e) {
      console.log('error handling in logoff component\n', e);
      throw e;
    }
  }

  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <Button type="button" onClick={() => setError('')}>
            Clear Error
          </Button>
        </div>
      )}

      {isLoggingOff ? (
        <h1>You have successfully logged off....</h1>
      ) : (
        <Button type="button" onClick={() => handleLogoff()}>
          Log Off
        </Button>
      )}
    </>
  );
}
