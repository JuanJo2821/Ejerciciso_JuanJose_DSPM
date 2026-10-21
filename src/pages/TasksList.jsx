// src/pages/TasksList.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
} from '@ionic/react';
import { TasksContext } from '../context/TasksContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import TaskList from '../components/TaskList.jsx';

// Esta página revisa su propia sesión (igual que LoginRoute revisa la
// suya). Si no hay usuario, se muestra a sí misma como <Navigate>, sin
// depender de un componente extra por fuera que confunda a Ionic.
function TasksList() {
    const { tareas, deleteTarea, toggleTarea } = useContext(TasksContext);
    const { user, cargando, logout } = useContext(AuthContext);

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const handleLogout = async () => {
        await logout();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mis Tareas</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton onClick={handleLogout}>Salir</IonButton>

                <IonButton expand="block" routerLink="/tasks/new">
                    Nueva tarea
                </IonButton>

                <TaskList tareas={tareas} onDelete={deleteTarea} onToggle={toggleTarea} />
            </IonContent>
        </IonPage>
    );
}

export default TasksList;