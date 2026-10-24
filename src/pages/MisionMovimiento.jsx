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
import { useGeolocation } from '../hooks/useGeolocation.jsx';
import { DISTANCIA_META, distanciaEnMetros } from '../utils/misiones.js';

function MisionMovimiento() {
    const [activa, setActiva] = useState(false);
    const [origen, setOrigen] = useState(null);
    const [distancia, setDistancia] = useState(0);

    const { user, cargando } = useContext(AuthContext);
    const navigate = useNavigate();
    const { lista, completar } = useProgreso();
    const { position, error, startTracking, stopTracking } = useGeolocation();

    const mision = lista.find((m) => m.id === 2);

    useEffect(() => {
        if (!activa || !position) return;

        if (!origen) {
            setOrigen(position);
            return;
        }

        const metros = distanciaEnMetros(
            origen.latitude,
            origen.longitude,
            position.latitude,
            position.longitude
        );
        setDistancia(metros);

        if (metros > DISTANCIA_META) {
            stopTracking();
            setActiva(false);
            completar(2);
        }
    }, [position]);

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const handleIniciar = async () => {
        setOrigen(null);
        setDistancia(0);
        setActiva(true);
        await startTracking();
    };

    const handleDetener = async () => {
        await stopTracking();
        setActiva(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Misión 2: Movimiento</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <p>{mision.descripcion}</p>
                <p>Recompensa: {mision.puntos} puntos</p>

                {mision.completed ? (
                    <IonText color="success">
                        <h3>Misión completada</h3>
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
                            Distancia recorrida: {distancia.toFixed(1)} m de {DISTANCIA_META} m
                        </p>
                        <IonProgressBar value={Math.min(distancia / DISTANCIA_META, 1)} />

                        {activa && !origen && <p>Buscando tu posición original...</p>}
                        {origen && (
                            <p>
                                Origen: {origen.latitude.toFixed(5)}, {origen.longitude.toFixed(5)}
                            </p>
                        )}
                    </>
                )}

                {error && (
                    <IonText color="danger">
                        <p>{error.message}</p>
                    </IonText>
                )}

                <IonButton expand="block" fill="clear" onClick={() => navigate('/home')}>
                    Volver a misiones
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default MisionMovimiento;