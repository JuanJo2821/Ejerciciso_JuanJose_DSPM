import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
} from '@ionic/react';
import { useAccelerometer } from '../hooks/useAccelerometer.jsx';

const MotionPage = () => {
    const {
        acceleration, magnitude,
        isShaking, isMoving
    } = useAccelerometer({ threshold: 18 });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Acelerómetro</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <p>X: {acceleration.x.toFixed(2)}</p>
                <p>Y: {acceleration.y.toFixed(2)}</p>
                <p>Z: {acceleration.z.toFixed(2)}</p>

                <p>Movimiento: {isMoving ? "Sí" : "No"}</p>
                <p>Magnitud: {magnitude.toFixed(2)}</p>

                {isShaking && <h1>SHAKE DETECTADO</h1>}
            </IonContent>
        </IonPage>
    );
};

export default MotionPage;
