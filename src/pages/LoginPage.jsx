import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import ErrorDisplay from '../shared/ErrorDisplay';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // const from = '/todos';
  const from = location.state?.from?.pathname || '/todos';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    console.log('Errors: ', authError);
  }, [authError]);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoggingOn(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        const error = result?.error?.message + '\n' + result?.message;
        throw error;
      }
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <>
      {authError && (
        <ErrorDisplay error={authError} onClick={() => setAuthError('')} />
      )}
      {isLoggingOn ? (
        <h1>Is Logging Inn....</h1>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="email">Email: </Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <br />
          <Form.Label htmlFor="password">Password: </Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={!email || !password}
            onClick={handleSubmit}
          >
            LogIn
          </Button>
        </Form>
      )}
    </>
  );
}
