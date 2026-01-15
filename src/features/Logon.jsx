import { useEffect, useState } from 'react';
import { post } from '../utils/api';

export default function Logon({ onSetEmail, onSetToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    async function logOn() {
      setIsLoggingOn(true);
      try {
        const data = await post('user/logon', {
          body: { email, password },
        });
        if (data.name && data.csrfToken) {
          onSetEmail(data.name);
          onSetToken(data.csrfToken);
        } else {
          setAuthError(`Authentication failed: ${data?.message}`);
        }
      } catch (error) {
        setAuthError(`Error: ${error.name} | ${error.message}`);
      } finally {
        setIsLoggingOn(false);
      }
    }
    logOn();
  }

  useEffect(() => {
    console.log('Errors: ', authError);
  }, [authError]);

  return (
    <>
      {isLoggingOn ? (
        <h1>Is Logging Inn....</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={!email || !password}
            onClick={handleSubmit}
          >
            LogIn
          </button>
        </form>
      )}
    </>
  );
}
