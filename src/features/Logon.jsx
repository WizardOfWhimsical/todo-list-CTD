import { useEffect, useState } from 'react';

export default function Logon({
  onSetEmail = () => {},
  onSetToken = () => {},
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Its hitting');
    async function logOn() {
      try {
        const response = await fetch(`${baseUrl}/user/logon`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200 && data.name && data.csrfToken) {
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
  // https://ctd-learns-node-l42tx.ondigitalocean.app

  // useEffect(() => {
  //   console.log(`${baseUrl}/user/logon`);
  //   logOn();
  // }, [baseUrl, logOn]);

  return (
    <>
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
    </>
  );
}

/** 
 * https://ctd-learns-node-l42tx.ondigitalocean.app/tasks?sortBy=title&sortDirection=desc
 *  
 * async function handleAuthenticate(credentials) {
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    setIsAuthenticating(true);
    const resp = await fetch(`${baseUrl}/auth/login`, options);
    if (!resp.ok) {
      if (resp.status === 401) {
        setAuthError('email or password incorrect');
      }
      throw new Error(resp.status);
    }
    const userData = await resp.json();
    // ADD CODE HERE!
    
    setAuthError('');
    setIsAuthenticating(false);
    setIsAuthFormOpen(false);
  } catch (error) {
    setIsAuthenticating(false);
    console.log(error.message);
  }
}
 */
