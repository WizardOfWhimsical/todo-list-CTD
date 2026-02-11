import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Button from 'react-bootstrap/Button';
import ErrorDisplay from '../../shared/ErrorDisplay/ErrorDisplay';
import styles from './Logoff.module.css';

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
      if (result.success) {
        navigate('/login', { replace: true });
      } else {
        setError(result.error);
        setIsLoggingOff(false);
        const error = result.error;
        throw error;
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      {error && <ErrorDisplay error={error} onclick={() => setError('')} />}
      {isLoggingOff ? (
        <h1>You have successfully logged off....</h1>
      ) : (
        <Button
          type="button"
          className={styles.logoffBtn}
          onClick={() => handleLogoff()}
        >
          Log Off
        </Button>
      )}
    </>
  );
}
