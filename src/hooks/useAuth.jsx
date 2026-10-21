// src/hooks/useAuth.jsx
import { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Custom hook que maneja toda la lógica de autenticación con Firebase.
// Empieza con "use" porque por dentro usa useState y useEffect.
export function useAuth() {
    const [user, setUser] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // onAuthStateChanged avisa cada vez que cambia la sesión (login,
        // logout, o cuando recargas la página y Firebase ya sabe quién
        // eras). Así el AuthContext siempre sabe si hay alguien logueado,
        // sin tener que manejarlo a mano con localStorage.
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setCargando(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    return { user, cargando, login, register, logout };
}
