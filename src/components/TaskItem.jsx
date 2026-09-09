// src/components/TaskItem.jsx
import { IonItem, IonButton } from '@ionic/react';

function TaskItem({ tarea, onDelete, onToggle }) {
    return (
        <IonItem>
            <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                {tarea.texto}
            </span>
            <IonButton onClick={() => onToggle(tarea.id)}>
                {tarea.completada ? 'Deshacer' : 'Completar'}
            </IonButton>
            <IonButton onClick={() => onDelete(tarea.id)} color="danger">
                Eliminar
            </IonButton>
        </IonItem>
    );
}

export default TaskItem;