import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
} from '@ionic/react';
import { useDevice } from '../hooks/useDevice.jsx';

const DevicePage = () => {
    const { battery, info, deviceId, loading } = useDevice();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Dispositivo</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                        <p>Batería: {battery?.batteryLevel * 100}%</p>
                        <p>{battery?.isCharging ? "Cargando" : "No cargando"}</p>

                        <p>Modelo: {info?.model}</p>
                        <p>Plataforma: {info?.platform}</p>
                        <p>OS: {info?.operatingSystem}</p>

                        <p>ID: {deviceId}</p>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default DevicePage;
