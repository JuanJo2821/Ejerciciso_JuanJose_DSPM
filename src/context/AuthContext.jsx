// src/context/AuthContext.jsx
import { createContext } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

export const AuthContext = createContext();

// Envuelve toda la app y comparte el usuario logueado (y las funciones
// login/register/logout) con cualquier página que las necesite, sin
// tener que pasarlas por props de componente en componente.
export function AuthProvider({ children }) {
    const authData = useAuth();

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}
