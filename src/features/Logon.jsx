import { useEffect, useState } from 'react';

export default function Logon({
  onSetEmail = () => {},
  onSetToken = () => {},
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLogginOn, setIsLogginOn] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  function handleSubmit(event) {
    event.preventDefault();
    console.log('logging in', email, '\n\t\t', password);
  }

  useEffect(() => {
    console.log(`${baseUrl}/user/logon`);
    fetch(baseUrl)
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
      });
  }, [baseUrl]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
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
