import { useState, useContext } from 'react';
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
    IonText,
} from '@ionic/react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useProgreso } from '../context/ProgresoContext.jsx';
import { useCamera } from '../hooks/useCamera.jsx';

function MisionFoto() {
    const [mensaje, setMensaje] = useState('');

    const { user, cargando } = useContext(AuthContext);
    const navigate = useNavigate();
    const { lista, completar } = useProgreso();
    const { photo, takePhoto } = useCamera();

    if (cargando) return null;
    if (!user) return <Navigate to="/login" replace />;

    const mision = lista.find((m) => m.id === 1);

    const handleTomarFoto = async () => {
        try {
            setMensaje('');
            await takePhoto();
        } catch (err) {
            setMensaje('No se tomó la foto');
        }
    };

    const handleGuardar = async () => {
        await completar(1);
        setMensaje('Foto guardada');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Misión 1: Evidencia</IonTitle>
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
                        <IonButton expand="block" onClick={handleTomarFoto}>
                            Tomar foto
                        </IonButton>

                        {photo && <img src={photo} />}

                        <IonButton
                            expand="block"
                            color="success"
                            onClick={handleGuardar}
                            disabled={!photo}
                        >
                            Guardar foto
                        </IonButton>
                    </>
                )}

                {mensaje && <p>{mensaje}</p>}

                <IonButton expand="block" fill="clear" onClick={() => navigate('/home')}>
                    Volver a misiones
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default MisionFoto;