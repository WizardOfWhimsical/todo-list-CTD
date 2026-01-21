import { createContext, useContext, useState } from 'react';
import { post } from '../utils/api';

//create context
const AuthContext = createContext();

// custom hook with error checking
export function useAuth() {
  const context = useContext(AuthContext);
  console.log('Auth context:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  //set state
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  /**
   * code (functions) goes here...
   * Found what they want me to add here, i will need to move it into api.js, its a fetch
   */

  async function login(userEmail, password) {
    // setIsLoggingOn(true);
    try {
      const data = await post('user/logon', {
        body: { email: userEmail, password },
      });
      if (data.name && data.csrfToken) {
        setEmail(data.name);
        setToken(data.csrfToken);
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

  async function logout(token) {
    if (!token) setToken('') && setEmail('');

    try {
      const logoffData = await post('user/logoff', {
        headers: { 'X-CSRF-TOKEN': token },
      });

      console.log(logoffData);
      return {
        success: true,
        message: `${email} Successfully logged off`,
        error: null,
      };
    } catch (error) {
      return {
        message: `Something went wrong logging off: ${error.message}`,
        error,
      };
    } finally {
      //whether success/fail this needs to happen
      setToken('');
      setEmail('');
    }
  }

  //context value obj
  const value = {
    email,
    token,
    // If the token exists, we're authenticated
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
