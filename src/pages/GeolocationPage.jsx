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
import { useGeolocation } from '../hooks/useGeolocation.jsx';

const GeolocationPage = () => {
    const {
        position, error,
        getCurrentLocation,
        startTracking, stopTracking,
    } = useGeolocation();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Geolocalización</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={getCurrentLocation}>
                    Obtener ubicación actual
                </IonButton>

                <IonButton expand="block" onClick={startTracking}>
                    Iniciar
                </IonButton>

                <IonButton expand="block" color="medium" onClick={stopTracking}>
                    Detener
                </IonButton>

                <p>Latitud: {position?.latitude}</p>
                <p>Longitud: {position?.longitude}</p>
                <p>Precisión: {position?.accuracy}</p>

                {error && (
                    <IonText color="danger">
                        <p>{error.message}</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default GeolocationPage;
