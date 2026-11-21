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
                    <IonTitle>Mapas</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonButton expand="block" routerLink="/map">
                    Mapa
                </IonButton>

                <IonButton expand="block" routerLink="/history">
                    Historial
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
