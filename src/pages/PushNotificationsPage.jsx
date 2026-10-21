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
import { usePushNotifications } from '../hooks/usePushNotifications.jsx';

const PushNotificationsPage = () => {
    const {
        requestPermission, token,
        notification, error,
    } = usePushNotifications();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Notificaciones push</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={requestPermission}>
                    Activar Push
                </IonButton>

                <p>Token: {token}</p>

                {notification && (
                    <p>{notification.title} - {notification.body}</p>
                )}

                {error && (
                    <IonText color="danger">
                        <p>{error.message ?? String(error)}</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default PushNotificationsPage;
