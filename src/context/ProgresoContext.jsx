import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';
import useRealTimeCollection from '../hooks/useRealTimeCollection.jsx';
import { useLocalNotifications } from '../hooks/useLocalNotifications.jsx';
import { MISIONES } from '../utils/misiones.js';

export const ProgresoContext = createContext();

const INICIALES = MISIONES.map((m) => ({ id: m.id, completed: false }));

const clave = (uid) => `progreso_${uid}`;

const unir = (guardadas) =>
    MISIONES.map((m) => {
        const guardada = (guardadas || []).find((g) => g.id === m.id);
        return { id: m.id, completed: guardada ? Boolean(guardada.completed) : false };
    });

const sumarPuntos = (missions) =>
    MISIONES.reduce((total, m) => {
        const mision = missions.find((x) => x.id === m.id);
        return mision && mision.completed ? total + m.puntos : total;
    }, 0);

export function ProgresoProvider({ children }) {
    const { user } = useContext(AuthContext);
    const { results, isPending, update } = useRealTimeCollection(user ? 'usuarios' : null);
    const { permission, requestPermission, sendNotification } = useLocalNotifications();

    const [missions, setMissions] = useState(INICIALES);
    const [cargado, setCargado] = useState(false);
    const [esperando, setEsperando] = useState(false);

    useEffect(() => {
        setCargado(false);
        setEsperando(false);

        if (!user) {
            setMissions(INICIALES);
            return;
        }

        const guardado = localStorage.getItem(clave(user.uid));
        if (guardado) {
            const datos = JSON.parse(guardado);
            setMissions(unir(datos.missions));
            setCargado(true);
        } else {
            setEsperando(true);
        }
    }, [user?.uid]);

    useEffect(() => {
        if (!user || !esperando || isPending) return;

        const mio = results.find((r) => r.id === user.uid);
        setMissions(mio ? unir(mio.missions) : INICIALES);
        setEsperando(false);
        setCargado(true);
    }, [user?.uid, esperando, isPending, results]);

    const puntos = sumarPuntos(missions);

    useEffect(() => {
        if (!user || !cargado) return;

        const datos = { points: puntos, missions };
        localStorage.setItem(clave(user.uid), JSON.stringify(datos));
        update(user.uid, { email: user.email, ...datos });
    }, [missions, cargado]);

    useEffect(() => {
        if (user && permission && permission !== 'granted') {
            requestPermission();
        }
    }, [user?.uid, permission]);

    const completar = async (id) => {
        const mision = missions.find((m) => m.id === id);
        if (!mision || mision.completed) return;

        const nuevas = missions.map((m) =>
            m.id === id ? { ...m, completed: true } : m
        );
        setMissions(nuevas);

        const faltan = nuevas.filter((m) => !m.completed).length;

        const base = Math.floor(Date.now() / 1000);

        await sendNotification({
            id: base,
            title: 'Misiones',
            body: 'Has completado una misión',
        });

        if (faltan === 1) {
            await sendNotification({
                id: base + 1,
                title: 'Misiones',
                body: 'Te falta 1 misión para completar',
            });
        }
    };

    const reiniciar = () => {
        setMissions(INICIALES);
    };

    const lista = MISIONES.map((m) => ({
        ...m,
        completed: missions.find((x) => x.id === m.id).completed,
    }));

    const completadas = missions.filter((m) => m.completed).length;
    const total = MISIONES.length;
    const porcentaje = Math.round((completadas / total) * 100);

    const value = {
        lista,
        puntos,
        completadas,
        total,
        porcentaje,
        usuarios: results,
        completar,
        reiniciar,
    };

    return (
        <ProgresoContext.Provider value={value}>
            {children}
        </ProgresoContext.Provider>
    );
}

export const useProgreso = () => useContext(ProgresoContext);