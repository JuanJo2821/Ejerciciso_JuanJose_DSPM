// src/pages/TaskDetail.jsx
import { useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
} from '@ionic/react';
import { TasksContext } from '../context/TasksContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getTareaById, toggleTarea, deleteTarea } = useContext(TasksContext);
    const { user, cargando } = useContext(AuthContext);

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const tarea = getTareaById(id);

    if (!tarea) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Detalle de la tarea</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <p>Esta tarea ya no existe.</p>
                    <IonButton routerLink="/tasks">Volver</IonButton>
                </IonContent>
            </IonPage>
        );
    }

    const handleEliminar = () => {
        deleteTarea(tarea.id);
        navigate('/tasks');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Detalle de la tarea</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h2 style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                    {tarea.texto}
                </h2>

                <p>Estado: {tarea.completada ? 'Completada' : 'Pendiente'}</p>

                <IonButton onClick={() => toggleTarea(tarea.id)}>
                    {tarea.completada ? 'Marcar pendiente' : 'Marcar completada'}
                </IonButton>

                <IonButton routerLink={`/tasks/edit/${tarea.id}`}>
                    Editar
                </IonButton>

                <IonButton color="danger" onClick={handleEliminar}>
                    Eliminar
                </IonButton>

                <IonButton fill="clear" routerLink="/tasks">
                    Volver
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default TaskDetail;