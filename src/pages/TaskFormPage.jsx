// src/pages/TaskFormPage.jsx
// Una sola página que sirve para "Agregar" y para "Editar" una tarea,
// según si la ruta trae o no un :id (así lo pide el Challenge 05).
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
} from '@ionic/react';
import { TasksContext } from '../context/TasksContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

function TaskFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addTarea, editTarea, getTareaById } = useContext(TasksContext);
    const { user, cargando } = useContext(AuthContext);

    const [texto, setTexto] = useState('');
    const esEdicion = Boolean(id);

    useEffect(() => {
        if (esEdicion) {
            const tarea = getTareaById(id);
            if (tarea) {
                setTexto(tarea.texto);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // El corte de sesión va DESPUÉS de todos los hooks (useState,
    // useEffect): los hooks siempre se deben llamar en el mismo orden,
    // sin importar si la función termina antes con un return.
    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const handleGuardar = () => {
        if (texto === '') return;

        if (esEdicion) {
            editTarea(Number(id), texto);
        } else {
            addTarea(texto);
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
                <IonInput
                    value={texto}
                    placeholder="Descripción de la tarea"
                    onIonChange={(e) => setTexto(e.detail.value)}
                />

                <IonButton expand="block" onClick={handleGuardar}>
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