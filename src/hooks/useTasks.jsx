import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import useRealTimeCollection from './useRealTimeCollection.jsx';

export function useTasks() {
    const { user } = useContext(AuthContext);

    const { results, isPending, error, add, update, deleteDoc } =
        useRealTimeCollection(user ? 'tareas' : null);

    const tareas = results;
    const cargandoTareas = isPending && results.length === 0;

    const getTareaById = (id) => {
        return tareas.find((t) => t.id === id);
    };

    const addTarea = (texto) => {
        return add({ texto: texto, completada: false });
    };

    const editTarea = (id, nuevoTexto) => {
        const tarea = getTareaById(id);
        if (!tarea) return;
        return update(id, {
            texto: nuevoTexto,
            completada: tarea.completada,
            createdAt: tarea.createdAt,
        });
    };

    const deleteTarea = (id) => {
        return deleteDoc(id);
    };

    const toggleTarea = (id) => {
        const tarea = getTareaById(id);
        if (!tarea) return;
        return update(id, {
            texto: tarea.texto,
            completada: !tarea.completada,
            createdAt: tarea.createdAt,
        });
    };

    return {
        tareas,
        cargandoTareas,
        errorTareas: error,
        addTarea,
        editTarea,
        deleteTarea,
        toggleTarea,
        getTareaById,
    };
}
