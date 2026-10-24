import { createContext } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const authData = useAuth();

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}
