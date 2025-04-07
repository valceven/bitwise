import React, { createContext, useContext, useEffect, useState } from 'react';

// create userContext
const UserContext = createContext();

// custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
}

// UserProvder to provide context claue to the tree daw
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(addUser) : null;
    });

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    useEffect(() => {
        
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem('user');
            setUser(savedUser ? JSON.parse(savedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return {
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    }

}