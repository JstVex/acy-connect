import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
    _id: string;
    name?: string;
    email: string;
    token: string;
}

interface AuthContextProps {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => null,
    logout: () => null,
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        return storedUser;
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    console.log('AuthContext state:', { user });

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
