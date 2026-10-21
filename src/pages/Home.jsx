import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
} from '@ionic/react';

const Home = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sensores</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="block" routerLink="/geolocation">
                    Geolocalización
                </IonButton>

                <IonButton expand="block" routerLink="/camera">
                    Cámara
                </IonButton>

                <IonButton expand="block" routerLink="/motion">
                    Acelerómetro
                </IonButton>

                <IonButton expand="block" routerLink="/device">
                    Dispositivo
                </IonButton>

                <IonButton expand="block" routerLink="/haptics">
                    Vibración
                </IonButton>

                <IonButton expand="block" routerLink="/filesystem">
                    Archivos
                </IonButton>

                <IonButton expand="block" routerLink="/local-notifications">
                    Notificaciones locales
                </IonButton>

                <IonButton expand="block" routerLink="/push-notifications">
                    Notificaciones push
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
