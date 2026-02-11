import { useState } from 'react';
import { post } from '../utils/api';
import { AuthContext } from '../hooks/useAuth';

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  async function login(userEmail, password) {
    try {
      const data = await post('user/logon', {
        body: { email: userEmail, password },
      });
      if (data.name && data.csrfToken) {
        setEmail(data.name);
        setToken(data.csrfToken);
        localStorage.setItem('email', data.name);
        localStorage.setItem('token', data.csrfToken);
        return {
          success: true,
          message: `${userEmail} Successfully logged In`,
          error: null,
        };
      } else {
        const error = data;
        error.status = data.status;
        error.message = `Athentication failed: ${data?.message}`;
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error,
        message: 'Network error during login',
      };
    }
  }

  async function logout() {
    if (!token) setToken('') && setEmail('');

    try {
      await post('user/logoff', {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': token },
      });

      return {
        success: true,
        message: `${email} Successfully logged off`,
        error: null,
      };
    } catch (error) {
      return {
        message: `Something went wrong logging off: ${error}`,
        error,
      };
    } finally {
      setToken('');
      setEmail('');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    }
  }

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
