import { IonList } from '@ionic/react';
import TaskItem from './TaskItem.jsx';

function TaskList({ tareas, onDelete, onToggle, sinConexion }) {
    return (
        <IonList>
            {tareas.map((tarea) => (
                <TaskItem
                    key={tarea.id}
                    tarea={tarea}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    sinConexion={sinConexion}
                />
            ))}
        </IonList>
    );
}

export default TaskList;
