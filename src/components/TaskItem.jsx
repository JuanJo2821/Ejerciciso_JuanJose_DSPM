// src/components/TaskItem.jsx
import { IonItem, IonButton } from '@ionic/react';

function TaskItem({ tarea, onDelete, onToggle }) {
    return (
        <IonItem>
            <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                {tarea.texto}
            </span>
            <IonButton routerLink={`/tasks/${tarea.id}`} fill="clear">
                Ver
            </IonButton>
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