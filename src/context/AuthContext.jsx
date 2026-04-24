import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

const getPersistedUser = () => {
    try {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getPersistedUser);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('authToken')));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        clearError();

        try {
            if (!email || !password) {
                throw new Error('Email e senha são obrigatórios');
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Email inválido');
            }

            if (password.length < 6) {
                throw new Error('Senha deve ter no mínimo 6 caracteres');
            }

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Falha na autenticação');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
            setIsAuthenticated(false);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [clearError]);

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        clearError();
        setUser(null);
        setIsAuthenticated(false);
    }, [clearError]);

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        clearError
    }), [user, isAuthenticated, isLoading, error, login, logout, clearError]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }

    return context;
};
