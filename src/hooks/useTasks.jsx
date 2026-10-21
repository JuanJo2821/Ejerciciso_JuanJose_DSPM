// src/hooks/useTasks.jsx
import { useState } from 'react';

// Custom hook con toda la lógica de las tareas (mismo comportamiento que
// ya tenías en Home.jsx del Challenge 3), solo que ahora vive aparte para
// poder compartirla entre varias páginas a través del TasksContext.
export function useTasks() {
    const [tareas, setTareas] = useState([]);

    const addTarea = (texto) => {
        const nueva = {
            id: Date.now(),
            texto: texto,
            completada: false,
        };
        setTareas((prev) => [...prev, nueva]);
    };

    const editTarea = (id, nuevoTexto) => {
        setTareas((prev) =>
            prev.map((t) => (t.id === id ? { ...t, texto: nuevoTexto } : t))
        );
    };

    const deleteTarea = (id) => {
        setTareas((prev) => prev.filter((t) => t.id !== id));
    };

    const toggleTarea = (id) => {
        setTareas((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completada: !t.completada } : t
            )
        );
    };

    const getTareaById = (id) => {
        return tareas.find((t) => t.id === Number(id));
    };

    return { tareas, addTarea, editTarea, deleteTarea, toggleTarea, getTareaById };
}
