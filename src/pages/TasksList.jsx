import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    IonSpinner,
    IonText,
} from '@ionic/react';
import { TasksContext } from '../context/TasksContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import useNetwork from '../hooks/useNetwork.jsx';
import TaskList from '../components/TaskList.jsx';

function TasksList() {
    const { tareas, cargandoTareas, errorTareas, deleteTarea, toggleTarea } =
        useContext(TasksContext);
    const { user, cargando } = useContext(AuthContext);
    const { isOnline } = useNetwork();

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mis Tareas</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton fill="clear" routerLink="/home">
                    Inicio
                </IonButton>

                {!isOnline && (
                    <IonText color="danger">
                        <p>Sin conexión: no puedes crear, editar ni borrar tareas.</p>
                    </IonText>
                )}

                {errorTareas && (
                    <IonText color="danger">
                        <p>{errorTareas}</p>
                    </IonText>
                )}

                <IonButton expand="block" routerLink="/tasks/new" disabled={!isOnline}>
                    Nueva tarea
                </IonButton>

                {cargandoTareas ? (
                    <IonSpinner name="crescent" />
                ) : (
                    <TaskList
                        tareas={tareas}
                        onDelete={deleteTarea}
                        onToggle={toggleTarea}
                        sinConexion={!isOnline}
                    />
                )}
            </IonContent>
        </IonPage>
    );
}

export default TasksList;
