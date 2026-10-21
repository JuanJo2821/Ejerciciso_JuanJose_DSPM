import { useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText,
} from '@ionic/react';
import { TasksContext } from '../context/TasksContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import useNetwork from '../hooks/useNetwork.jsx';

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getTareaById, toggleTarea, deleteTarea, cargandoTareas } =
        useContext(TasksContext);
    const { user, cargando } = useContext(AuthContext);
    const { isOnline } = useNetwork();

    if (cargando || cargandoTareas) return null;
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

    const handleEliminar = async () => {
        await deleteTarea(tarea.id);
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

                {!isOnline && (
                    <IonText color="danger">
                        <p>Sin conexión: las acciones están deshabilitadas.</p>
                    </IonText>
                )}

                <IonButton onClick={() => toggleTarea(tarea.id)} disabled={!isOnline}>
                    {tarea.completada ? 'Marcar pendiente' : 'Marcar completada'}
                </IonButton>

                <IonButton routerLink={`/tasks/edit/${tarea.id}`} disabled={!isOnline}>
                    Editar
                </IonButton>

                <IonButton color="danger" onClick={handleEliminar} disabled={!isOnline}>
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
