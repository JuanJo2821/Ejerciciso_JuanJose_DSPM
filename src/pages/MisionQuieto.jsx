import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
    IonProgressBar,
    IonText,
} from '@ionic/react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useProgreso } from '../context/ProgresoContext.jsx';
import { useAccelerometer } from '../hooks/useAccelerometer.jsx';
import { useHaptics } from '../hooks/useHaptics.jsx';
import { SEGUNDOS_QUIETO } from '../utils/misiones.js';

function MisionQuieto() {
    const [activa, setActiva] = useState(false);
    const [segundos, setSegundos] = useState(0);

    const { user, cargando } = useContext(AuthContext);
    const navigate = useNavigate();
    const { lista, completar } = useProgreso();
    const { isMoving } = useAccelerometer();
    const { vibrate } = useHaptics();

    const mision = lista.find((m) => m.id === 3);
    const desbloqueada = lista.find((m) => m.id === 2).completed;

    useEffect(() => {
        if (!activa) return;

        if (isMoving) {
            setSegundos(0);
            return;
        }

        const temporizador = setTimeout(() => {
            setSegundos((s) => s + 1);
        }, 1000);

        return () => clearTimeout(temporizador);
    }, [activa, isMoving, segundos]);

    useEffect(() => {
        if (activa && segundos >= SEGUNDOS_QUIETO) {
            setActiva(false);
            vibrate(1000);
            completar(3);
        }
    }, [segundos]);

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const handleIniciar = () => {
        setSegundos(0);
        setActiva(true);
    };

    const handleDetener = () => {
        setActiva(false);
        setSegundos(0);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Misión 3: Permanencia</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <p>{mision.descripcion}</p>
                <p>Recompensa: {mision.puntos} puntos</p>

                {mision.completed ? (
                    <IonText color="success">
                        <h3>Misión completada</h3>
                    </IonText>
                ) : !desbloqueada ? (
                    <IonText color="danger">
                        <h3>Primero completa la misión de moverte más de 30 metros</h3>
                    </IonText>
                ) : (
                    <>
                        {!activa ? (
                            <IonButton expand="block" onClick={handleIniciar}>
                                Iniciar misión
                            </IonButton>
                        ) : (
                            <IonButton expand="block" color="medium" onClick={handleDetener}>
                                Detener
                            </IonButton>
                        )}

                        <p>
                            Tiempo quieto: {segundos} / {SEGUNDOS_QUIETO} segundos
                        </p>
                        <IonProgressBar value={segundos / SEGUNDOS_QUIETO} />

                        <p>Movimiento detectado: {isMoving ? 'Sí' : 'No'}</p>
                    </>
                )}

                <IonButton expand="block" fill="clear" onClick={() => navigate('/home')}>
                    Volver a misiones
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default MisionQuieto;