// src/context/TasksContext.jsx
import { createContext } from 'react';
import { useTasks } from '../hooks/useTasks.jsx';

export const TasksContext = createContext();

// Comparte la lista de tareas y sus funciones (agregar, editar, borrar,
// completar) entre TasksList, TaskFormPage y TaskDetail, sin prop drilling.
export function TasksProvider({ children }) {
    const tasksData = useTasks();

    return (
        <TasksContext.Provider value={tasksData}>
            {children}
        </TasksContext.Provider>
    );
}
