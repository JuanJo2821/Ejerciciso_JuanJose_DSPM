import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonText,
} from '@ionic/react';
import { TasksContext } from '../context/TasksContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import useNetwork from '../hooks/useNetwork.jsx';

function TaskFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addTarea, editTarea, getTareaById, cargandoTareas } =
        useContext(TasksContext);
    const { user, cargando } = useContext(AuthContext);
    const { isOnline } = useNetwork();

    const [texto, setTexto] = useState('');
    const esEdicion = Boolean(id);

    useEffect(() => {
        if (esEdicion && !cargandoTareas) {
            const tarea = getTareaById(id);
            if (tarea) {
                setTexto(tarea.texto);
            }
        }
    }, [id, cargandoTareas]);

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const handleGuardar = async () => {
        if (texto.trim() === '') return;

        if (esEdicion) {
            await editTarea(id, texto.trim());
        } else {
            await addTarea(texto.trim());
        }

        navigate('/tasks');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{esEdicion ? 'Editar tarea' : 'Nueva tarea'}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {!isOnline && (
                    <IonText color="danger">
                        <p>Sin conexión: no puedes guardar cambios.</p>
                    </IonText>
                )}

                <IonInput
                    value={texto}
                    placeholder="Descripción de la tarea"
                    onIonChange={(e) => setTexto(e.detail.value ?? '')}
                />

                <IonButton expand="block" onClick={handleGuardar} disabled={!isOnline}>
                    Guardar
                </IonButton>

                <IonButton fill="clear" routerLink="/tasks">
                    Cancelar
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default TaskFormPage;
