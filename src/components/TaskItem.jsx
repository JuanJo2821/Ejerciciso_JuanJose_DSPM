import { IonItem, IonButton } from '@ionic/react';

function TaskItem({ tarea, onDelete, onToggle, sinConexion }) {
    return (
        <IonItem>
            <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                {tarea.texto}
            </span>
            <IonButton routerLink={`/tasks/${tarea.id}`} fill="clear">
                Ver
            </IonButton>
            <IonButton onClick={() => onToggle(tarea.id)} disabled={sinConexion}>
                {tarea.completada ? 'Deshacer' : 'Completar'}
            </IonButton>
            <IonButton onClick={() => onDelete(tarea.id)} color="danger" disabled={sinConexion}>
                Eliminar
            </IonButton>
        </IonItem>
    );
}

export default TaskItem;
