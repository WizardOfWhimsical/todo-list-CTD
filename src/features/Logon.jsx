import { useEffect, useState } from 'react';
import post from '../utils/api';

export default function Logon({ onSetEmail, onSetToken }) {
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
        const response = await post('user/logon', email, password);
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
    const resp = await fetch(`${baseUrl}/auth/login`, options);
    if (!resp.ok) {
      //status will be 401 if authentication fails
      //we want to handle it differently than other errors
      if (resp.status === 401) {
        console.dir(resp);
      }
      throw new Error(resp.status);
    }
    console.dir(userData);
  } catch (error) {
    console.dir(error);
  }
}
 */
