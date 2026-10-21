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
import { useLocalNotifications } from '../hooks/useLocalNotifications.jsx';

const LocalNotificationsPage = () => {
    const {
        permission, error,
        requestPermission, sendNotification,
        scheduleNotification,
    } = useLocalNotifications();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Notificaciones locales</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <p>Permiso: {permission}</p>

                <IonButton expand="block" onClick={requestPermission}>
                    Permisos
                </IonButton>

                <IonButton
                    expand="block"
                    onClick={() =>
                        sendNotification({
                            title: "Hola tu",
                            body: "Notificación inmediata",
                        })
                    }
                >
                    Enviar ahora
                </IonButton>

                <IonButton
                    expand="block"
                    onClick={() =>
                        scheduleNotification({
                            title: "Recordatorio",
                            body: "En 5 segundos",
                            seconds: 5,
                        })
                    }
                >
                    Programar
                </IonButton>

                {error && (
                    <IonText color="danger">
                        <p>{error.message}</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default LocalNotificationsPage;
