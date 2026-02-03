import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoggingOn(true);
    await login(email, password);
    setIsLoggingOn(false);
  }

  useEffect(() => {
    console.log('Errors: ', authError);
  }, [authError]);

  return (
    <>
      {authError && (
        <div>
          <p>{authError}</p>
          <button type="button" onClick={() => setAuthError('')}>
            Clear Authorization
          </button>
        </div>
      )}
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
