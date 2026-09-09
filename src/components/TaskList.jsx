// src/components/TaskList.jsx
import { IonList } from '@ionic/react';
import TaskItem from './TaskItem.jsx';

function TaskList({ tareas, onDelete, onToggle }) {
    return (
        <IonList>
            {tareas.map((tarea) => (
                <TaskItem 
                    key={tarea.id} 
                    tarea={tarea} 
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </IonList>
    );
}

export default TaskList;