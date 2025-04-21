import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/auth/authApi'; // Adjust the import path as necessary
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode for decoding JWT tokens

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider to provide context value to the tree
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

    const [accessToken, setAccessToken] = useState(() => {
        return localStorage.getItem('accessToken') || null;
    });

    const [isLoading, setIsLoading] = useState(false);

    const loginUser = async (response) => {
        try {
          setIsLoading(true);
          const { user, accessToken } = response;
          
          // Decode token to extract expiration time (using jwt-decode or any other method)
          const decodedToken = jwtDecode(accessToken);  // Decodes the JWT token
          const expirationTime = decodedToken.exp * 1000;  // Convert to milliseconds
          
          // Save user and access token in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('accessTokenExpiration', expirationTime);  // Store expiration time
      
          setUser(user);
          setAccessToken(accessToken);

        } catch (error) {
          console.error('Login Error: ', error);
        } finally {
          setIsLoading(false);
        }
      };
    
    const updateUser = async (userId, userData) => {
        try {
            setIsLoading(true);
            const response = await authApi.editUser(userId, userData);  
            if (response) {
                console.log("HELLO WORLD")
                const updatedUser = { ...user, ...response };
                setUser(updatedUser);   
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const logoutUser = async (email) => {
        try {
          await authApi.logoutUser( {email} ); // Call the logout API
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('accessTokenExpiration');
        } catch (error) {
          console.error('Logout Error: ', error);
        }
    };

    const isTokenExpired = () => {
        const expirationTime = localStorage.getItem('accessTokenExpiration');
        return expirationTime && new Date().getTime() > expirationTime;
    };

    // Function to refresh the access token if expired
    const refreshAccessToken = async () => {
        try {
          setIsLoading(true);
          console.log('Refreshing access token...');
    
          // Fetch the refresh token from cookies (assume it's stored there)
          const refreshToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)RefreshToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          );
    
          // Use the apiService to call the backend and refresh the token
          const response = await authApi.refreshAccessToken({ refreshToken });
    
          if (response && response.accessToken) {
            const { accessToken } = response;
    
            // Update access token state and localStorage
            setAccessToken(accessToken);
            localStorage.setItem('accessToken', accessToken);
          } else {
            throw new Error('Failed to refresh access token');
          }
        } catch (error) {
          console.error('Error refreshing access token:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        const checkTokenExpiration = async () => {
          // Simple logic: If no access token is present or expired, refresh it
          if (isTokenExpired()) {
            await refreshAccessToken();
          }
        };
    
        // Set an interval to check every minute
        const interval = setInterval(checkTokenExpiration, 60000);
    
        return () => clearInterval(interval);
      }, [accessToken]);
    
      useEffect(() => {
        const handleStorageChange = () => {
          const savedUser = localStorage.getItem('user');
          setUser(savedUser ? JSON.parse(savedUser) : null);
          const savedAccessToken = localStorage.getItem('accessToken');
          setAccessToken(savedAccessToken);
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);
    
      return (
        <UserContext.Provider value={{
          user,
          accessToken,
          isLoading,
          loginUser,
          logoutUser,
          updateUser,
          refreshAccessToken
        }}>
          {children}
        </UserContext.Provider>
      );
    };