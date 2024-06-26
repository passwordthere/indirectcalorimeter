import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      axios.get('http://localhost:8000/api/user/', {
        headers: {
          'Authorization': `Token ${authToken}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data', error);
      });
    } else {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);